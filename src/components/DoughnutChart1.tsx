import { Chart as ChartJS, Plugin } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import DATA from '../data/colorsVotingData.json';

ChartJS.register(ChartDataLabels);

export const DoughnutChart1 = () => {
  const data = {
    labels: DATA.map((color) => color.colorLabel),
    datasets: [
      {
        label: '# of Votes',
        data: DATA.map((color) => color.votes),
        backgroundColor: DATA.map((color) => color.colorHash),
        borderColor: DATA.map((color) => color.colorHash),
        borderWidth: 1,
        cutout: '80%',
      },
    ],
  };

  const hoverLabels: Plugin<'doughnut'> = {
    id: 'hoverLabels',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea } = chart;
      const { width, height } = chartArea;
      const activeElements = chart.getActiveElements();

      let textLabel = chart.legend?.legendItems?.[0]?.text || '';
      let dataLabel = chart.data.datasets[0].data[0] || 0;
      let color = '#fe7f2d';

      if (activeElements.length > 0) {
        const activeIndex = activeElements[0].index;
        textLabel = chart.data.labels![activeIndex] as string;
        dataLabel = chart.data.datasets[0].data[activeIndex] as number;
        color = (chart.data.datasets[0].borderColor as string[])[activeIndex];
      }

      ctx.save();
      ctx.font = 'bolder 24px Soho Gothic';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.fillText(`${textLabel}: ${dataLabel} votes`, width / 2, height / 1.5);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      tooltip: {
        padding: 10,
        bodyFont: {
          size: 10,
        },
        titleFont: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: 'Results of voting for color',
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="dataCard">
      <Doughnut data={data} options={options} plugins={[hoverLabels]} />
    </div>
  );
};
