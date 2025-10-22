import styles from './SensorDetails.module.css';
import { useState, useEffect } from 'react';
import { getVegetableSensorData } from '@/services/api';
import { 
  FaThermometerHalf, 
  FaTint, 
  FaSeedling, 
  FaFlask,
  FaChartLine,
  FaCog,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock
} from 'react-icons/fa';

export default function SensorDetails({ selectedVegetable }) {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedVegetable) {
      fetchSensorData();
    } else {
      setSensorData(null);
    }
  }, [selectedVegetable]);

  const fetchSensorData = async () => {
    if (!selectedVegetable?._id) return;
    
    setLoading(true);
    try {
      const data = await getVegetableSensorData(selectedVegetable._id);
      setSensorData(data);
    } catch (error) {
      console.error('Erro ao carregar dados dos sensores:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    return status === 'OK' ? FaCheckCircle : FaExclamationTriangle;
  };

  const getStatusColor = (status) => {
    return status === 'OK' ? '#27ae60' : '#e74c3c';
  };

  const getTemperature = () => {
    if (sensorData?.temperatura) {
      return Math.round(sensorData.temperatura);
    }
    return 24;
  };

  const getWaterLevel = () => {
    if (sensorData?.nivel_agua) {
      return Math.round(sensorData.nivel_agua);
    }
    if (selectedVegetable?.nivel?.nivel_agua) {
      return selectedVegetable.nivel.nivel_agua;
    }
    return 70;
  };

  const getWaterStatus = () => {
    const level = getWaterLevel();
    if (level >= 60 && level <= 80) return 'OK';
    if (level < 60) return 'Baixo';
    if (level > 80) return 'Alto';
    return 'OK';
  };

  const getSoilPH = () => {
    if (sensorData?.ph_solo) {
      return sensorData.ph_solo.toFixed(1);
    }
    return '6.5';
  };

  const getConductivity = () => {
    if (sensorData?.condutividade) {
      return sensorData.condutividade.toFixed(1);
    }
    return '1.5';
  };

  const getGrowthDays = () => {
    if (selectedVegetable) {
      return selectedVegetable.tempo_real || selectedVegetable.tempo_estimado || 'N/A';
    }
    return 'N/A';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <FaCog className={styles.headerIcon} />
          </div>
          <div className={styles.headerContent}>
            <h4 className={styles.title}>
              DETALHES DOS SENSORES
              {selectedVegetable && (
                <span className={styles.vegetableName}> - {selectedVegetable.nome_hortalica}</span>
              )}
            </h4>
            <div className={styles.subtitle}>
              <FaClock className={styles.subtitleIcon} />
              <span>
                {selectedVegetable ? 
                  `Monitoramento em tempo real` : 
                  'Dados dos sensores'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sensorsGrid}>
        <div className={styles.sensorCard}>
          <div className={styles.sensorIcon}>
            <FaThermometerHalf />
          </div>
          <div className={styles.sensorContent}>
            <div className={styles.sensorLabel}>Temperatura</div>
            <div className={styles.sensorValue}>{getTemperature()}°C</div>
            <div className={styles.sensorStatus}>
              <FaCheckCircle className={styles.statusIcon} style={{color: '#27ae60'}} />
              <span>Ideal</span>
            </div>
          </div>
        </div>

        <div className={styles.sensorCard}>
          <div className={styles.sensorIcon}>
            <FaTint />
          </div>
          <div className={styles.sensorContent}>
            <div className={styles.sensorLabel}>Nível de Água</div>
            <div className={styles.sensorValue}>{getWaterLevel()}%</div>
            <div className={styles.sensorStatus}>
              {(() => {
                const StatusIcon = getStatusIcon(getWaterStatus());
                const statusColor = getStatusColor(getWaterStatus());
                return (
                  <>
                    <StatusIcon className={styles.statusIcon} style={{color: statusColor}} />
                    <span>{getWaterStatus()}</span>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className={styles.sensorCard}>
          <div className={styles.sensorIcon}>
            <FaSeedling />
          </div>
          <div className={styles.sensorContent}>
            <div className={styles.sensorLabel}>Crescimento</div>
            <div className={styles.sensorValue}>{getGrowthDays()} dias</div>
            <div className={styles.sensorStatus}>
              <FaChartLine className={styles.statusIcon} style={{color: '#3498db'}} />
              <span>
                {selectedVegetable ? 
                  `${Math.round((selectedVegetable.tempo_real || selectedVegetable.tempo_estimado || 0) / 7 * 100)}%` : 
                  '85%'
                }
              </span>
            </div>
          </div>
        </div>

        <div className={styles.sensorCard}>
          <div className={styles.sensorIcon}>
            <FaFlask />
          </div>
          <div className={styles.sensorContent}>
            <div className={styles.sensorLabel}>pH do Solo</div>
            <div className={styles.sensorValue}>{getSoilPH()}</div>
            <div className={styles.sensorStatus}>
              <FaCheckCircle className={styles.statusIcon} style={{color: '#27ae60'}} />
              <span>Normal</span>
            </div>
          </div>
        </div>

        <div className={styles.sensorCard}>
          <div className={styles.sensorIcon}>
            <FaChartLine />
          </div>
          <div className={styles.sensorContent}>
            <div className={styles.sensorLabel}>Condutividade</div>
            <div className={styles.sensorValue}>{getConductivity()} mS/cm</div>
            <div className={styles.sensorStatus}>
              <FaCheckCircle className={styles.statusIcon} style={{color: '#27ae60'}} />
              <span>Estável</span>
            </div>
          </div>
        </div>

        {selectedVegetable && (
          <div className={styles.sensorCard}>
            <div className={styles.sensorIcon}>
              <FaSeedling />
            </div>
            <div className={styles.sensorContent}>
              <div className={styles.sensorLabel}>Tipo</div>
              <div className={styles.sensorValue}>{selectedVegetable.tipo_hortalica}</div>
              <div className={styles.sensorStatus}>
                <FaCheckCircle className={styles.statusIcon} style={{color: '#27ae60'}} />
                <span>Cadastrado</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className={styles.loading}>
          <span>Carregando dados dos sensores...</span>
        </div>
      )}
    </div>
  );
}
