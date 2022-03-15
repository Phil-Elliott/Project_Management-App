import React from "react"
import { Bar } from "react-chartjs-2"

const state = {
  labels: ["Accounting", "Marketing", "Business", "IT", "Programming"],
  datasets: [
    {
      label: "Tasks",
      backgroundColor: "rgb(248, 68, 68)",
      borderColor: "purple",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(248, 68, 68,.9)",
      hoverBorderColor: "rgba(248, 68, 68,.9)",
      data: [10, 16, 4, 13, 22],
    },
  ],
}

const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: false,
      font: { size: 12, family: "rubik" },
    },
    legend: { display: false, position: "right" },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      position: "bottom",
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
}

const BarChart = () => {
  return (
    <div className="dashboard-department-chart">
      <Bar data={state} options={options} />
    </div>
  )
}

export default BarChart

/*
    1) Fix overflow
    2) Remove plus 
    3) Change colors 
    4) Remove grid 
    5) 



*/
