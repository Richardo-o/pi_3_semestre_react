import styles from './Indicators.module.css';
import { useState, useEffect } from 'react';
import { getVegetableSensorData } from '@/services/api';
import { 
  FaThermometerHalf, 
  FaTint, 
  FaSun, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaLeaf,
  FaSeedling,
  FaCloudRain,
  FaWind
} from 'react-icons/fa';

export default function Indicators({ selectedVegetable }) {
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

  // Função para calcular o nível de água baseado na hortaliça selecionada
  const getWaterLevel = () => {
    if (sensorData?.nivel_agua) {
      return `${Math.round(sensorData.nivel_agua)}%`;
    }
    if (selectedVegetable?.nivel?.nivel_agua) {
      return `${selectedVegetable.nivel.nivel_agua}%`;
    }
    return '70%';
  };

  // Função para obter o status baseado na hortaliça selecionada
  const getWaterStatus = () => {
    const level = sensorData?.nivel_agua || selectedVegetable?.nivel?.nivel_agua;
    if (level) {
      if (level >= 60 && level <= 80) return 'Perfeita';
      if (level < 60) return 'Baixa';
      if (level > 80) return 'Alta';
    }
    return 'Perfeita';
  };

  // Função para obter temperatura
  const getTemperature = () => {
    if (sensorData?.temperatura) {
      return `${Math.round(sensorData.temperatura)}°C`;
    }
    return '24°C';
  };

  // Função para obter luminosidade
  const getLuminosity = () => {
    if (sensorData?.luminosidade) {
      return `${Math.round(sensorData.luminosidade)} lux`;
    }
    return '800 lux';
  };

  // Função para obter pH do solo
  const getSoilPH = () => {
    if (sensorData?.ph_solo) {
      return `${sensorData.ph_solo.toFixed(1)}`;
    }
    return '6.5';
  };

  // Função para obter condutividade
  const getConductivity = () => {
    if (sensorData?.condutividade) {
      return `${sensorData.condutividade.toFixed(1)} mS/cm`;
    }
    return '1.5 mS/cm';
  };

  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.blue}`}>
        <div className={styles.iconContainer}>
          <FaThermometerHalf className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Temperatura</div>
          <div className={styles.value}>{getTemperature()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Ideal</span>
          </div>
        </div>
      </div>
      
      <div className={`${styles.card} ${styles.green}`}>
        <div className={styles.iconContainer}>
          <FaTint className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Nível de Água</div>
          <div className={styles.value}>{getWaterLevel()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>{getWaterStatus()}</span>
          </div>
        </div>
      </div>
      
      <div className={`${styles.card} ${styles.yellow}`}>
        <div className={styles.iconContainer}>
          <FaSun className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Luminosidade</div>
          <div className={styles.value}>{getLuminosity()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Ótima</span>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.purple}`}>
        <div className={styles.iconContainer}>
          <FaLeaf className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Crescimento</div>
          <div className={styles.value}>
            {selectedVegetable ? 
              `${Math.round((selectedVegetable.tempo_real || selectedVegetable.tempo_estimado || 0) / 7 * 100)}%` : 
              '85%'
            }
          </div>
          <div className={styles.status}>
            <FaSeedling className={styles.statusIcon} />
            <span>
              {selectedVegetable ? 
                `${selectedVegetable.tempo_real || selectedVegetable.tempo_estimado || 'N/A'} dias` : 
                'Excelente'
              }
            </span>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.orange}`}>
        <div className={styles.iconContainer}>
          <FaCloudRain className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>pH do Solo</div>
          <div className={styles.value}>{getSoilPH()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Normal</span>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.teal}`}>
        <div className={styles.iconContainer}>
          <FaWind className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Condutividade</div>
          <div className={styles.value}>{getConductivity()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Suave</span>
          </div>
        </div>
      </div>
    </div>
  );
}
