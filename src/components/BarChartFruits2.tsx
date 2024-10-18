import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import DATA from '../data/fruitPrices.json';
import { calculatePercentageChange } from '../helpers';

Chart.register(...registerables);

export const BarChartFruits2 = () => {
  const data = {
    labels: DATA.map((fruit) => fruit.label),
    datasets: [
      {
        label: 'Old Price ($)',
        data: DATA.map((fruit) => fruit.oldPrice),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        categoryPercentage: 0.5,
        order: 0,
      },
      {
        label: 'New Price ($)',
        data: DATA.map((fruit) => fruit.newPrice),
        backgroundColor: 'rgba(164, 195, 178, 0.5)',
        borderColor: 'rgba(107, 144, 128, 1)',
        borderWidth: 1,
        order: 1,
      },
    ],
  };

  const percentageChanges = DATA.map((fruit) => {
    return calculatePercentageChange(fruit.oldPrice, fruit.newPrice).toFixed(1);
  });

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: {
          color: '#ffccd5',
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#ffccd5',
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Fruit Prices Changes',
        font: {
          size: 14,
        },
      },
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const value = tooltipItem.raw;
            let label = `Price: ${value} $`;

            if (datasetIndex === 1) {
              const index = tooltipItem.dataIndex;
              const percentage = percentageChanges[index];
              label +=
                +percentage > 0
                  ? `, more expensive by ${percentage}%`
                  : `, cheaper by ${+percentage * -1}%`;
            }
            return label;
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
      <Bar data={data} options={options} />
    </div>
  );
};
