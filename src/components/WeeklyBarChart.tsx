import { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

export const WeeklyBarChart = () => {
  const chartRef = useRef<any>(null);
  const [minWeek, setMinWeek] = useState(8);
  const [maxWeek, setMaxWeek] = useState(14);

  const weekLabels = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
  const weekDataPoints = Array.from({ length: 52 }, (_, i) => i + 1);

  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Weekly Data',
        data: weekDataPoints,
        backgroundColor: '#f1c0e8',
        borderColor: '#b9fbc0',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        min: minWeek,
        max: maxWeek,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleWeekChange = (startChange: number, endChange: number) => {
    const newMinWeek = minWeek + startChange;
    const newMaxWeek = maxWeek + endChange;

    if (newMinWeek < 0) {
      setMinWeek(0);
      setMaxWeek(6);
    } else if (newMaxWeek > weekLabels.length) {
      setMinWeek(weekLabels.length - 6);
      setMaxWeek(weekLabels.length - 1);
    } else {
      setMinWeek(newMinWeek);
      setMaxWeek(newMaxWeek);
    }

    chartRef.current?.update();
  };

  return (
    <div className="dataCard">
      <Bar ref={chartRef} data={data} options={options} />
      <div style={{ marginTop: '20px' }}>
        <button
          className="customButton"
          onClick={() => handleWeekChange(-6, -6)}
          disabled={minWeek === 0}
        >
          Previous
        </button>
        <button
          className="customButton"
          onClick={() => handleWeekChange(6, 6)}
          disabled={maxWeek === weekLabels.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
