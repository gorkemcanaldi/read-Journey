import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import style from "./Static.module.css";

ChartJS.register(ArcElement);

function Static({ book }) {
  const totalPagesRead = book.progress.reduce(
    (sum, s) => sum + (s.finishPage - s.startPage + 1),
    0,
  );
  const percentage = ((totalPagesRead / book.totalPages) * 100).toFixed(2);
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#30B94D", "#1F1F1F"],
        borderWidth: 0,
        hoverBackgroundColor: ["#30B94D", "#1F1F1F"],
        hoverOffset: 12,
        radius: "95%",
        hoverRadius: "105%",
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: { tooltip: { enabled: false } },
  };

  return (
    <div className={style.stat_div}>
      <span className={style.stat_span}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </span>
      <div className={style.static}>
        <div className={style.stat_chart}>
          <Doughnut data={data} options={options} />
          <p className={style.chart_d}>100%</p>
        </div>
        <div className={style.stat_d}>
          <div className={style.green}> </div>
          <span className={style.stat_p}> {percentage}%</span>
        </div>
        <p className={style.stat_total}>{totalPagesRead} pages read</p>
      </div>
    </div>
  );
}

export default Static;
