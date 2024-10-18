import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import DATA from '../data/expensesData.json';

Chart.register(...registerables);

export const LineChartExpenses = () => {
  const incomeData = DATA.map((item: any) => item.income);
  const expensesData = DATA.map((item: any) => item.expenses);
  const months = DATA.map((item: any) => item.month);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        segment: {
          borderColor: (ctx: any) => {
            const current = ctx.p0.parsed.y;
            const next = ctx.p1.parsed.y;
            return current > next
              ? 'rgba(255, 99, 132, 1)'
              : 'rgba(75, 192, 192, 1)';
          },
          borderDash: (ctx: any) =>
            ctx.p0.parsed.y > ctx.p1.parsed.y ? [6, 6] : [],
        },
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          color: 'rgba(255, 99, 132, 1)',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: 'rgba(255, 99, 132, 1)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#cce3de',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (USD)',
          color: 'rgba(75, 192, 192, 1)',
          font: {
            size: 16,
          },
        },
        ticks: {
          color: 'rgba(75, 192, 192, 1)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#cce3de',
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        labels: {
          color: '#303030',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const index = tooltipItem.dataIndex;
            const month = DATA[index].month;
            const salary = incomeData[index];
            const expenses = expensesData[index];
            const saved = salary - expenses;

            return tooltipItem.dataset.label === 'Income'
              ? `Month: ${month}, Income: ${salary} $, Saved: ${saved} $`
              : `Month: ${month}, Expenses: ${expenses} $, Saved: ${saved} $`;
          },
        },
        padding: 10,
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className="dataCard">
      <Line data={chartData} options={options} />
    </div>
  );
};
