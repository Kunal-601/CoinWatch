import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './LineChart.css';

const LineChart = ({ historicalData }) => {
  const data = {
    labels: historicalData.map(item => new Date(item[0])), // Ensure labels are Date objects
    datasets: [
      {
        label: 'Price',
        data: historicalData.map(item => item[1]),
        tension: 0.11,
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: '#ffffff',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointHoverBorderColor: '#ffffff',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
          color: '#333',
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          color: '#333',
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          color: '#333',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <h2 className="line-chart-title">Historical Price Chart</h2>
      <div className="line-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
