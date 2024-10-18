import { Scatter } from 'react-chartjs-2';
import DATA from '../data/expensesData.json';

export const ScatterChart = () => {
  const incomeData = DATA.map((item: any, index: number) => ({
    x: index + 1,
    y: item.income,
  }));

  const expensesData = DATA.map((item: any, index: number) => ({
    x: index + 1,
    y: item.expenses,
  }));

  const chartData = {
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 20,
      },
      {
        label: 'Expenses',
        data: expensesData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 20,
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
          callback: (value: any) => {
            const months = DATA.map((item: any) => item.month);
            return months[value - 1];
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
            const month = DATA[index].fullMonth;
            const salary = incomeData[index].y;
            const expanses = expensesData[index].y;
            const saved = salary - expanses;

            return tooltipItem.dataset.label === 'Income'
              ? `Month: ${month}, Income: ${salary} $, Saved: ${saved} $`
              : `Month: ${month}, Expenses: ${expanses} $, Saved: ${saved} $`;
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
      <Scatter data={chartData} options={options} />
    </div>
  );
};
