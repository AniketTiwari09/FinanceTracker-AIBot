import React, { useState } from "react";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true,  });
const Chatbox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { sender: "User", text: input }];
    setMessages(newMessages);

    try {
      // Send user input to the Groq API
      const response = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
        model: "llama3-8b-8192",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
      });

      // Extract the bot's response
      const botMessage = response?.choices?.[0]?.message?.content || "No response";
      setMessages([...newMessages, { sender: "Groq AI", text: botMessage }]);
    } catch (error) {
      console.error("Error with Groq API:", error);
      const errorMessage =
        error?.response?.data?.message || "Sorry, something went wrong.";
      setMessages([...newMessages, { sender: "Groq AI", text: errorMessage }]);
    }

    // Clear input field
    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "User" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "User" ? "#dcf8c6" : "#f1f0f0",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.button} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "auto",
    marginTop: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  chatWindow: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  message: {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chatbox;
