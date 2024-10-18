import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartOptions, ChartEvent } from 'chart.js';

import DATA from '../data/populationDataS.json';

interface PopulationData {
  color: string;
  country: string;
  population: string;
  salary: string;
  website: string;
}

const options: ChartOptions<'pie'> = {
  onHover: (event: ChartEvent, chartElement: any) => {
    (event.native?.target as HTMLElement).style.cursor = chartElement[0]
      ? 'pointer'
      : 'default';
  },
  plugins: {
    title: {
      display: true,
      text: 'Average population by Country',
      font: {
        size: 18,
      },
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const country = tooltipItem.label;
          const population = tooltipItem.formattedValue;
          return `${country}: ${population} people`;
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
};

const populationData = DATA.map((data: PopulationData) => +data.population);

const countryData = {
  labels: DATA.map((data: PopulationData) => data.country),
  datasets: [
    {
      label: 'Population of Country',
      data: populationData,
      backgroundColor: DATA.map((data: PopulationData) => data.color),
      borderColor: DATA.map((data: PopulationData) => data.color),
      borderWidth: 1,
    },
  ],
};

export const PieChart = () => {
  const chartRef = useRef<any>(null);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current;
    if (!chart) return;

    const clickedSlice = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      true
    );
    const websiteData = DATA.map((data: PopulationData) => data.website);

    if (clickedSlice.length) {
      const pieSlice = clickedSlice[0];
      const index = pieSlice.index;
      const website = websiteData[index];
      if (website) {
        window.open(website);
      }
    }
  };

  return (
    <div className="dataCard">
      <Pie
        ref={chartRef}
        data={countryData}
        options={options}
        onClick={handleClick}
      />
      <span className="descriptionSpan">
        *Click on the country's area to visit the website
      </span>
    </div>
  );
};
