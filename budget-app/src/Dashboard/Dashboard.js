


import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../Chatbox/Chatbot';

const Dashboard  = () => {
  const [lineChartData, setLineChartData] = useState([10, 20, 30, 40, 60, 70, 80]);
  const [barChartData, setBarChartData] = useState([10, 20, 30, 40, 60, 70, 80]);
  const [pieChartData, setPieChartData] = useState([
    40, 375, 93, 400, 400, 100, 50, 10, 20, 30, 40, 60, 70, 80, 90, 100, 110, 120
  ]);

  const [lineChartLabels, setLineChartLabels] = useState([
    'Gym', 'Rent', 'Utilities', 'Grocery', 'Events', 'shop', 'electronics'
  ]);
  const [barChartLabels, setBarChartLabels] = useState([
    'Gym', 'Rent', 'Utilities', 'Grocery', 'Events', 'shop', 'electronics'
  ]);
  const [pieChartLabels, setPieChartLabels] = useState([
    'Car', 'Gym', 'Rent', 'Utilities', 'Grocery', 'Events', 'shop', 'electronics', '09', '10', '11', '12'
  ]);

  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to the homepage upon logout
    navigate('/'); // Replace with the route to your homepage
  };

  const fetchChartDataFromBackend = () => {
    axios.get('http://localhost:3002/chartData')
      .then(response => {
        const { lineChartData, barChartData, pieChartData } = response.data;
        setLineChartData(lineChartData);
        setBarChartData(barChartData);
        setPieChartData(pieChartData);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
        // Optionally handle errors (e.g., show an error message)
      });
  };

  useEffect(() => {

    fetchChartDataFromBackend();

    let lineChart = null;
    let barChart = null;
    let pieChart = null;

    const lineData = {
      labels: lineChartLabels,
      datasets: [{
        label: 'Monthly Expenses',
        data: lineChartData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)', // Green Line
        tension: 0.1,
      }],
    };

    const barData = {
      labels: barChartLabels,
      datasets: [{
        label: 'Category-Wise Spending',
        data: barChartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
          'rgba(75, 192, 192, 0.5)', // Green
          'rgba(153, 102, 255, 0.5)', // Purple
          'rgba(255, 159, 64, 0.5)', // Orange
          'rgba(255, 99, 71, 0.5)',  // Tomato
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 71, 1)',
        ],
        borderWidth: 1,
      }],
    };

    const pieData = {
      labels: pieChartLabels,
      datasets: [{
        label: 'Income Sources',
        data: pieChartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(54, 162, 235, 0.5)', // Blue
          'rgba(255, 206, 86, 0.5)', // Yellow
          'rgba(75, 192, 192, 0.5)', // Green
          'rgba(153, 102, 255, 0.5)', // Purple
          'rgba(255, 159, 64, 0.5)', // Orange
          'rgba(99, 255, 132, 0.5)', // Lime Green
        ],
        hoverOffset: 4,
      }],
    };


    if (lineChartRef.current) {
      lineChart = new Chart(lineChartRef.current, {
        type: 'line',
        data: lineData,
      });
    }

    if (barChartRef.current) {
      barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: barData,
      });
    }

    if (pieChartRef.current) {
      pieChart = new Chart(pieChartRef.current, {
        type: 'pie',
        data: pieData,
      });
    }

    return () => {

      if (lineChart) {
        lineChart.destroy();
      }
      if (barChart) {
        barChart.destroy();
      }
      if (pieChart) {
        pieChart.destroy();
      }
    };
  }, [lineChartData, barChartData, pieChartData, lineChartLabels, barChartLabels, pieChartLabels]);

  const handleLineDataChange = (e, index) => {
    const newData = [...lineChartData];
    newData[index] = parseInt(e.target.value, 10);
    setLineChartData(newData);
  };

  const handleBarDataChange = (e, index) => {
    const newData = [...barChartData];
    newData[index] = parseInt(e.target.value, 10);
    setBarChartData(newData);
  };

  const handlePieDataChange = (e, index) => {
    const newData = [...pieChartData];
    newData[index] = parseInt(e.target.value, 10);
    setPieChartData(newData);
  };

  const handleLineLabelChange = (e, index) => {
    const newLabels = [...lineChartLabels];
    newLabels[index] = e.target.value;
    setLineChartLabels(newLabels);
  };

  const handleBarLabelChange = (e, index) => {
    const newLabels = [...barChartLabels];
    newLabels[index] = e.target.value;
    setBarChartLabels(newLabels);
  };

  const handlePieLabelChange = (e, index) => {
    const newLabels = [...pieChartLabels];
    newLabels[index] = e.target.value;
    setPieChartLabels(newLabels);
  };

  return (
    <div>
        <div>
      </div>
      <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
      {/* Line Chart */}
      <div>
        <h3>Line Chart</h3>
        {lineChartLabels.map((label, index) => (
          <div key={`line_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handleLineLabelChange(e, index)}
            />
            <input
              type="number"
              value={lineChartData[index]}
              onChange={(e) => handleLineDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={lineChartRef} />

      {/* Bar Chart */}
      <div>
        <h3>Bar Chart</h3>
        {barChartLabels.map((label, index) => (
          <div key={`bar_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handleBarLabelChange(e, index)}
            />
            <input
              type="number"
              value={barChartData[index]}
              onChange={(e) => handleBarDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={barChartRef} />

      {/* Pie Chart */}
      <div>
        <h3>Pie Chart</h3>
        {pieChartLabels.map((label, index) => (
          <div key={`pie_label_${index}`}>
            <input
              type="text"
              value={label}
              onChange={(e) => handlePieLabelChange(e, index)}
            />
            <input
              type="number"
              value={pieChartData[index]}
              onChange={(e) => handlePieDataChange(e, index)}
            />
          </div>
        ))}
      </div>
      <canvas ref={pieChartRef} />
      {/* Chatbox Component */}
      <Chatbox />

    </div>

    
  );

  
};



export default Dashboard;
