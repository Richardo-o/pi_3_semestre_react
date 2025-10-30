import React, { useState, useEffect } from 'react';
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
  FaTint, 
  FaSave, 
  FaSpinner,
  FaExclamationTriangle,
  FaChartLine,
  FaCalendarAlt
} from 'react-icons/fa';
import { apiFetch } from '@/services/api';
import styles from './WaterLevelChart.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const WaterLevelChart = ({ selectedVegetable }) => {
  const [waterLevel, setWaterLevel] = useState('');
  const [waterHistory, setWaterHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Dados padrão para quando não há hortaliça selecionada
  const defaultData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Nível da Água (L)',
        data: [75, 80, 70, 85, 90, 88, 82],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }
    ]
  };

  const chartOptions = {
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
        min: 0,
        max: 200,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11,
            weight: '500'
          },
          callback: function(value) {
            return value + 'L';
          }
        }
      }
    }
  };

  // Atualiza o nível de água quando uma hortaliça é selecionada
  useEffect(() => {
    if (selectedVegetable && selectedVegetable.nivel && selectedVegetable.nivel.nivel_agua !== null && selectedVegetable.nivel.nivel_agua !== undefined) {
      setWaterLevel(selectedVegetable.nivel.nivel_agua.toString());
    } else {
      setWaterLevel('');
    }
  }, [selectedVegetable]);

  // Busca histórico real do back-end (nível de água por usuário)
  const fetchWaterHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const { history } = await apiFetch('/water-level/history?limit=7');
      setWaterHistory(Array.isArray(history) ? history : []);
    } catch (err) {
      console.error('Erro ao carregar histórico de água:', err);
      setError('Erro ao carregar histórico de água');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWaterLevel = async () => {
    if (!selectedVegetable) {
      alert('Selecione uma hortaliça primeiro');
      return;
    }

    const level = parseFloat(waterLevel);
    if (isNaN(level) || level < 0 || level > 200) {
      alert('Nível da água deve estar entre 0 e 200 litros');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Atualiza o nível da água da hortaliça selecionada
      await apiFetch(`/hortalicas/${selectedVegetable._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nome_hortalica: selectedVegetable.nome_hortalica,
          tipo_hortalica: selectedVegetable.tipo_hortalica,
          tempo_estimado: selectedVegetable.tempo_estimado,
          tempo_real: selectedVegetable.tempo_real,
          fertilizantes: selectedVegetable.fertilizantes || [],
          nivel: {
            nivel_agua: level,
            nivel_fertilizante: selectedVegetable.nivel?.nivel_fertilizante || 50
          }
        })
      });
      
      alert('Nível da água atualizado com sucesso!');
      
      // Recarrega histórico real
      fetchWaterHistory();
      
    } catch (err) {
      console.error('Erro ao salvar nível da água:', err);
      setError('Erro ao salvar nível da água');
      alert('Erro ao salvar nível da água');
    } finally {
      setSaving(false);
    }
  };

  const getChartData = () => {
    // Se não há hortaliça selecionada, usa dados padrão
    if (!selectedVegetable) {
      return defaultData;
    }

    // Se há hortaliça selecionada mas sem nível definido, usa dados padrão
    if (selectedVegetable.nivel?.nivel_agua === null || selectedVegetable.nivel?.nivel_agua === undefined) {
      return defaultData;
    }

    // Com hortaliça selecionada, usa histórico global do usuário
    return {
      labels: waterHistory.map(item => item.date),
      datasets: [
        {
          label: `Nível da Água (L)`,
          data: waterHistory.map(item => item.level),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3498db',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }
      ]
    };
  };

  useEffect(() => {
    // Carrega histórico ao montar e ao trocar a hortaliça
    fetchWaterHistory();
  }, [selectedVegetable?._id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <FaTint className={styles.headerIcon} />
          </div>
          <div className={styles.headerContent}>
            <h4 className={styles.title}>
              {selectedVegetable ? `NÍVEL DE ÁGUA - ${selectedVegetable.nome_hortalica.toUpperCase()}` : 'NÍVEL DE ÁGUA'}
            </h4>
            <div className={styles.subtitle}>
              <FaCalendarAlt className={styles.subtitleIcon} />
              <span>
                {selectedVegetable ? `Monitoramento do nível de água da ${selectedVegetable.nome_hortalica}` : 'Selecione uma hortaliça para monitorar'}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.currentLevel}>
            <span className={styles.levelText}>
              {waterLevel ? `${waterLevel}L` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Input e botão para atualizar nível */}
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            <FaTint /> Nível Global da Água (L)
          </label>
          <div className={styles.inputContainer}>
            <input
              type="number"
              min="0"
              max="200"
              value={waterLevel}
              onChange={(e) => setWaterLevel(e.target.value)}
              className={styles.input}
              placeholder="Ex.: 75"
            />
              <button
                onClick={handleSaveWaterLevel}
                disabled={saving || !waterLevel}
                className={`${styles.saveButton} ${saving ? styles.saving : ''}`}
              >
                {saving ? (
                  <>
                    <FaSpinner className={styles.spinner} />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Salvar
                  </>
                )}
              </button>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className={styles.chartContainer}>
        {loading ? (
          <div className={styles.loading}>
            <FaSpinner className={styles.spinner} />
            <span>Carregando dados...</span>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <FaExclamationTriangle className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        ) : (
          <Line data={getChartData()} options={chartOptions} />
        )}
      </div>

      {/* Legenda */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <FaTint className={styles.legendIcon} style={{color: '#3498db'}} />
          <span>Nível da Água (L)</span>
        </div>
      </div>
    </div>
  );
};

export default WaterLevelChart;
