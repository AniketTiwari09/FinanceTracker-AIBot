const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors());

// Chart data route (example)
app.post('/chartData', (req, res) => {
  const { lineChartData, barChartData, pieChartData } = req.body;
  // Process or store the data as needed
  res.status(200).json({ message: 'Chart data received successfully' });
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server connected to MongoDB!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
