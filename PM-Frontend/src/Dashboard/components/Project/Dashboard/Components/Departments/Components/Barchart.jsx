import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ departmentData }) => {
  const dataNames = departmentData.map((department) => department.name);
  const dataTasks = departmentData.map((department) => department.tasks);

  const state = {
    labels: dataNames,
    datasets: [
      {
        label: "Tasks",
        backgroundColor: "#00006f",
        hoverBackgroundColor: "#00006f",
        data: dataTasks,
      },
    ],
  };

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
  };

  return (
    <div className="dashboard-department-chart">
      <Bar data={state} options={options} />
    </div>
  );
};

export default BarChart;

/*
    1) Make labels match all departments listed on tasks 
    2) Make data list number of tasks with it listed on it 


    could create an array of objects 
      [
        {
          department: Marketing, 
          tasks: 10, 
        }
      ]
    
    import active project data or have it passed 
    create interface for the array 
    create above array 
    map through the tasks 
      if(department )

      might need to double map
      or map and then filter to see if department is in new arr
        if it is then add 1 to tasks
        if not then add department and 1 for tasks and push



*/
