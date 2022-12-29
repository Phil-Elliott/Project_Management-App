import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ChartMain = ({ tasks, late, progress, completed }) => {
  const state = {
    labels: ["Late", "In Progress", "Completed"],

    datasets: [
      {
        cutout: "65%",
        label: "Tasks",
        backgroundColor: ["red", "blue", "green"],
        hoverBackgroundColor: ["#501800", "#003350", "#175000"],
        data: [late, progress, completed],
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 104).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = tasks.length,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 184).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = "Tasks Left",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.9;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <div className="project-hub-card-graph">
      <Doughnut
        data={state}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
        plugins={plugins}
      />
    </div>
  );
};

export default ChartMain;
