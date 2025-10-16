import styles from '@/components/GrowthChart/GrowthChart.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const data = {
  labels: ['Dia', 'Dia', 'Manhã', 'Semana', 'Semana'],
  datasets: [
    {
      label: 'Temperatura',
      data: [20, 24, 30, 35, 40],
      borderColor: 'red',
      fill: false
    },
    {
      label: 'Umidade',
      data: [30, 40, 45, 50, 60],
      borderColor: 'blue',
      fill: false
    },
    {
      label: 'Luminosidade',
      data: [35, 44, 55, 65, 75],
      borderColor: 'orange',
      fill: false
    }
  ]
};

export default function GrowthChart() {
  return (
    <div className={styles.container}>
      <h4>GRÁFICO DE CRESCIMENTO</h4>
      <Line data={data} />
    </div>
  );
}
