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
import { 
  FaChartLine, 
  FaThermometerHalf, 
  FaTint, 
  FaSun,
  FaCalendarAlt
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getVegetableGrowthHistory } from '@/services/api';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          weight: '600'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11,
          weight: '500'
        }
      }
    },
    y: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Temperatura (°C) / Umidade (%)'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11,
          weight: '500'
        }
      }
    },
    y1: {
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        text: 'Luminosidade (lux)'
      },
      grid: {
        drawOnChartArea: false
      },
      ticks: {
        font: {
          size: 11,
          weight: '500'
        }
      }
    }
  }
};

export default function GrowthChart({ selectedVegetable }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedVegetable) {
      fetchVegetableData();
    } else {
      // Dados padrão quando nenhuma hortaliça está selecionada
      setChartData({
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: [22, 24, 26, 28, 25, 23, 21],
            borderColor: '#FF6B35',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF6B35',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'Umidade (%)',
            data: [65, 70, 68, 72, 75, 78, 80],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'Luminosidade (lux)',
            data: [10000, 10200, 10100, 9900, 10050, 12000, 11900],
            borderColor: '#FFE66D',
            backgroundColor: 'rgba(255, 230, 109, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FFE66D',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y1'
          }
        ]
      });
    }
  }, [selectedVegetable]);

  const fetchVegetableData = async () => {
    if (!selectedVegetable?._id) return;
    
    setLoading(true);
    setError(null);
    try {
      const history = await getVegetableGrowthHistory(selectedVegetable._id);
      const labels = history.map(item => new Date(item.createdAt).toLocaleDateString('pt-BR', { weekday: 'short' }));
      const temperaturaData = history.map(item => item.temperatura);
      const umidadeData = history.map(item => item.umidade);
      const luminosidadeData = history.map(item => item.luminosidade);

      if (!history.length) {
        setChartData(null);
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: temperaturaData,
            borderColor: '#FF6B35',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF6B35',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'Umidade (%)',
            data: umidadeData,
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4ECDC4',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y'
          },
          {
            label: 'Luminosidade (lux)',
            data: luminosidadeData,
            borderColor: '#FFE66D',
            backgroundColor: 'rgba(255, 230, 109, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FFE66D',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            yAxisID: 'y1'
          }
        ]
      });
    } catch (error) {
      console.error('Erro ao carregar dados da hortaliça:', error);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <FaChartLine className={styles.headerIcon} />
          </div>
          <div className={styles.headerContent}>
            <h4 className={styles.title}>
              GRÁFICO DE CRESCIMENTO
              {selectedVegetable && (
                <span className={styles.vegetableName}>
                  - {selectedVegetable.nome_hortalica}
                </span>
              )}
            </h4>
            <div className={styles.subtitle}>
              <FaCalendarAlt className={styles.subtitleIcon} />
              <span>
                {selectedVegetable ? 
                  `Monitoramento da ${selectedVegetable.nome_hortalica}` : 
                  'Últimos 7 dias'}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.trendIndicator}>
            <span className={styles.trendText}>
              {selectedVegetable ? 
                `${selectedVegetable.tempo_real || selectedVegetable.tempo_estimado || 'N/A'} dias` : 
                '+12%'}
            </span>
          </div>
        </div>
      </div>
      
      <div className={styles.chartContainer}>
        {loading ? (
          <div className={styles.loading}>
            <span>Carregando dados da hortaliça...</span>
          </div>
        ) : error ? (
          <div className={styles.noData}>
            <span>{error}</span>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className={styles.noData}>
            <span>{selectedVegetable ? 'Sem dados de sensores para esta hortaliça' : 'Selecione uma hortaliça para visualizar os dados'}</span>
          </div>
        )}
      </div>
      
      <div className={styles.legend}>
        {selectedVegetable ? (
          <>
            <div className={styles.legendItem}>
              <FaChartLine className={styles.legendIcon} style={{color: '#27ae60'}} />
              <span>Crescimento (%)</span>
            </div>
            <div className={styles.legendItem}>
              <FaTint className={styles.legendIcon} style={{color: '#3498db'}} />
              <span>Altura (cm)</span>
            </div>
            <div className={styles.legendItem}>
              <FaSun className={styles.legendIcon} style={{color: '#e74c3c'}} />
              <span>Número de Folhas</span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.legendItem}>
              <FaThermometerHalf className={styles.legendIcon} style={{color: '#FF6B35'}} />
              <span>Temperatura</span>
            </div>
            <div className={styles.legendItem}>
              <FaTint className={styles.legendIcon} style={{color: '#4ECDC4'}} />
              <span>Umidade</span>
            </div>
            <div className={styles.legendItem}>
              <FaSun className={styles.legendIcon} style={{color: '#FFE66D'}} />
              <span>Luminosidade</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
