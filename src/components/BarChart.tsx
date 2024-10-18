import { Bar } from 'react-chartjs-2';

import DATA from '../data/salaryData.json';

export const BarChart = () => {
  return (
    <div className="dataCard">
      <Bar
        data={{
          labels: DATA.map((data) => data.name),
          datasets: [
            {
              label: 'Salary',
              data: DATA.map((data) => data.salary),
              backgroundColor: DATA.map((data) => data.color),
              borderRadius: 5,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              text: 'Revenue Source',
            },
          },
        }}
      />
    </div>
  );
};
