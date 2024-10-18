import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

import DATA from '../data/populationDataS.json';

export const DoughnutChart = () => {
  const chartData = {
    labels: DATA.map((data) => data.country),
    datasets: [
      {
        label: 'Average Monthly Salary (USD)',
        data: DATA.map((data) => +data.salary),
        backgroundColor: DATA.map((data) => data.color),
        borderColor: DATA.map((data) => data.color),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      title: {
        display: true,
        text: 'Average Monthly Salary by Country (USD)',
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const country = tooltipItem.label;
            const salary = tooltipItem.raw;
            return `${country}: $${salary}`;
          },
        },
      },
    },
  };

  return (
    <div className="dataCard">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
