
import { Plugin } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import DATA from '../data/colorsVotingData.json';

export const ProgressLinesBar = () => {
  const data = {
    labels: DATA.map((color) => color.colorLabel),
    datasets: [
      {
        label: '# of Votes',
        data: DATA.map((color) => color.votes),
        backgroundColor: DATA.map((color) => color.colorHash),
        borderColor: '#fff',
        borderWidth: 1,
        barPercentage: 0.3,
        borderSkipped: false,
        borderRadius: 10,
        categoryPercentage: 0.5,
      },
    ],
  };

  const roundedProgressBar: Plugin<'bar'> = {
    id: 'roundedProgressBar',
    beforeDatasetsDraw(chart) {
      const {
        ctx,
        data,
        chartArea: { top, left, right, height, width },
      } = chart;
      ctx.save();
      const segmentHeight = data.labels ? height / data.labels.length : 0;
      chart.getDatasetMeta(0).data.forEach((datapoint: any, index: number) => {
        datapoint.y = top + segmentHeight * (index + 0.9);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        if (data.labels) {
          ctx.fillText(
            data.labels[index] as unknown as string,
            left,
            datapoint.y - 15
          );
        }

        ctx.font = 'bold 15px sans-serif';
        ctx.fillStyle = datapoint.options.backgroundColor;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'right';
        ctx.fillText(
          String(data.datasets[0].data[index]),
          right,
          datapoint.y - 15
        );

        ctx.beginPath();
        ctx.strokeStyle = datapoint.options.borderColor;
        ctx.fillStyle = datapoint.options.borderColor;
        ctx.lineJoin = 'round';
        ctx.lineWidth = datapoint.height;
        ctx.strokeRect(
          left + datapoint.height / 2,
          datapoint.y,
          width - datapoint.height,
          1
        );

        ctx.restore();
      });
    },
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Progress line of voting for color',
        font: {
          size: 18,
        },
      },
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="dataCard">
      <Bar data={data} options={options} plugins={[roundedProgressBar]} />
    </div>
  );
};
