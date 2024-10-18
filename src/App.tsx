import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  ScatterController,
} from 'chart.js';
import { LineChart } from './components/LineChart';
import { BarChart } from './components/BarChart';
import { PieChart } from './components/PieChart';
import { DoughnutChart } from './components/DoughnutChart';
import { WeeklyBarChart } from './components/WeeklyBarChart';
import { WaterfallChart } from './components/WaterfallChart';
import { BarChartFruits } from './components/BarChartFruits';
import { DoughnutChart1 } from './components/DoughnutChart1';
import { ProgressLinesBar } from './components/ProgressLinesBar';
import { ScatterChart } from './components/ScatterChart';
import { LineChartExpenses } from './components/LineChartExpenses';
import { BarChartFruits2 } from './components/BarChartFruits2';

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  ArcElement,
  ScatterController,
  Title,
  Tooltip,
  Legend
);

export const App = () => {
  return (
    <div className="container">
      <LineChart />
      <BarChart />
      <PieChart />
      <DoughnutChart />
      <WeeklyBarChart />
      <WaterfallChart />
      <BarChartFruits />
      <BarChartFruits2/>
      <DoughnutChart1 />
      <ProgressLinesBar />
      <ScatterChart />
      <LineChartExpenses />
    </div>
  );
};
