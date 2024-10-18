import { useRef } from 'react';
import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import DATA from '../data/temperatureData.json';

const barColorCode = (ctx: any) => {
  const start = ctx.parsed._custom.start;
  const end = ctx.parsed._custom.end;
  const averageTemperature = (start + end) / 2;
  return averageTemperature > 20 ? '#ffca3a' : '#a3cef1';
};

export const WaterfallChart = () => {
  const chartRef = useRef<any>(null);
  const dataPoints = DATA.map((day) => ({
    low: day.low,
    high: day.high,
  }));

  const data = {
    labels: DATA.map((day) => day.day),
    datasets: [
      {
        label: 'Temperatures',
        data: DATA.map((day) => [day.low, day.high]),
        backgroundColor: barColorCode,
        borderColor: barColorCode,
        borderWidth: 1,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Temperature Variations',
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
            const dataIndex = tooltipItem.dataIndex;
            const { low, high } = dataPoints[dataIndex];
            const averageTemperature = (low + high) / 2;
            return averageTemperature > 20
              ? `Higher ${high}°C, lower ${low}°C - Warm Day`
              : `Higher ${high}°C, lower ${low}°C - Cool Day`;
          },
        },
      },
    },
  };

  return (
    <div className="dataCard">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};
