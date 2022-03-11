import React from "react"
import { Line } from "react-chartjs-2"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

const ChartMain = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "blue",
        borderColor: "red",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "grey",
      },
    ],
  }

  return (
    <div>
      <Line data={data} />
    </div>
  )
}

export default ChartMain

/*
  Could have date on top 
  Budget on left 
  Chart on right
    have diffirent colors 
      show green if good 
      maybe have three areas
        1) total 
        2) Where you should be 
        3) and where you are 
    could still resort back to a line graph 


    could save the stuff on the left for the finance page 


    Tasks 
      - creat a table for each task that was recently completed 
      - Tiem maybe use the doughnut chart down there like in planner
        maybe put the product launch back on that section 


*/
