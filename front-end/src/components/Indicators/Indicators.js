import styles from './Indicators.module.css';
import { useState, useEffect } from 'react';
import { getVegetableSensorData, apiFetch } from '@/services/api';
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

export default function Indicators() {
  const [waterLevel, setWaterLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWaterLevel();
  }, []);

  const fetchWaterLevel = async () => {
    setLoading(true);
    try {
      // Busca o nível global da água via API
      const response = await apiFetch('/water-level');
      setWaterLevel(response.nivel_agua);
    } catch (error) {
      console.error('Erro ao carregar nível da água:', error);
      // Fallback para valor padrão
      setWaterLevel(75);
    } finally {
      setLoading(false);
    }
  };

  // Função para obter o nível global da água em litros
  const getWaterLevel = () => {
    if (waterLevel !== null) {
      return `${waterLevel}L`;
    }
    return '75L';
  };

  // Função para obter o status baseado no nível global da água
  const getWaterStatus = () => {
    if (waterLevel !== null) {
      if (waterLevel >= 50 && waterLevel <= 150) return 'Perfeita';
      if (waterLevel < 50) return 'Baixa';
      if (waterLevel > 150) return 'Alta';
    }
    return 'Perfeita';
  };

  // Função para obter temperatura
  const getTemperature = () => {
    return '24°C';
  };

  // Função para obter luminosidade
  const getLuminosity = () => {
    return '800 lux';
  };

  // Função para obter pH do solo
  const getSoilPH = () => {
    return '6.5';
  };

  // Função para obter condutividade
  const getConductivity = () => {
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
          <div className={styles.label}>Nível Global da Água</div>
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
          <div className={styles.value}>85%</div>
          <div className={styles.status}>
            <FaSeedling className={styles.statusIcon} />
            <span>Excelente</span>
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
