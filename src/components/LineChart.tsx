import { Line } from 'react-chartjs-2';

import DATA from '../data/salaryData.json';

export const LineChart = () => {
  return (
    <div className="dataCard">
      <Line
        data={{
          labels: DATA.map((data) => data.salary),
          datasets: [
            {
              label: 'Monthly Salary',
              data: DATA.map((data) => data.salary),
              backgroundColor: DATA.map((data) => data.color),
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.2,
              borderColor: '#f6aa1c',
            },
          },
          plugins: {
            title: {
              text: 'Monthly Salary',
            },
          },
        }}
      />
    </div>
  );
};
