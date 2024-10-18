import { Bar } from 'react-chartjs-2';
import { calculatePercentageChange } from '../helpers';

import DATA from '../data/fruitPrices.json';

export const BarChartFruits = () => {
  const data = {
    labels: DATA.map((fruit) => fruit.label),
    datasets: [
      {
        label: 'Old Price ($)',
        data: DATA.map((fruit) => fruit.oldPrice),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 112, 1)',
        borderWidth: 1,
      },
      {
        label: 'New Price ($)',
        data: DATA.map((fruit) => fruit.newPrice),
        backgroundColor: 'rgba(164, 195, 178, 0.5)',
        borderColor: 'rgba(107, 144, 128, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  const percentageChanges = DATA.map((fruit) => {
    return calculatePercentageChange(fruit.oldPrice, fruit.newPrice).toFixed(1);
  });

  const options = {
    scales: {
      y: {
        grace: '5%',
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        filter: (tooltipItem: any) =>
          tooltipItem.datasetIndex === 0 || tooltipItem.datasetIndex === 1,
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
      },
      title: {
        display: true,
        text: 'Fruit Prices Changes',
        font: {
          size: 18,
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
