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
  // Função para obter o nível de água da hortaliça selecionada
  const getWaterLevel = () => {
    if (selectedVegetable && selectedVegetable.nivel && selectedVegetable.nivel.nivel_agua !== null && selectedVegetable.nivel.nivel_agua !== undefined) {
      return `${selectedVegetable.nivel.nivel_agua}L`;
    }
    return 'Não definido';
  };

  // Função para obter o status baseado no nível de água da hortaliça
  const getWaterStatus = () => {
    if (selectedVegetable && selectedVegetable.nivel && selectedVegetable.nivel.nivel_agua !== null && selectedVegetable.nivel.nivel_agua !== undefined) {
      const level = selectedVegetable.nivel.nivel_agua;
      if (level >= 50 && level <= 150) return 'Perfeita';
      if (level < 50) return 'Baixa';
      if (level > 150) return 'Alta';
    }
    return 'Não definido';
  };

  // Função para obter o nível de fertilizante da hortaliça selecionada
  const getFertilizerLevel = () => {
    if (selectedVegetable && selectedVegetable.nivel && selectedVegetable.nivel.nivel_fertilizante !== null && selectedVegetable.nivel.nivel_fertilizante !== undefined) {
      return `${selectedVegetable.nivel.nivel_fertilizante}%`;
    }
    return 'Não definido';
  };

  // Função para obter o status do fertilizante
  const getFertilizerStatus = () => {
    if (selectedVegetable && selectedVegetable.nivel && selectedVegetable.nivel.nivel_fertilizante !== null && selectedVegetable.nivel.nivel_fertilizante !== undefined) {
      const level = selectedVegetable.nivel.nivel_fertilizante;
      if (level >= 40 && level <= 80) return 'Adequado';
      if (level < 40) return 'Baixo';
      if (level > 80) return 'Alto';
    }
    return 'Não definido';
  };

  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!selectedVegetable?._id) {
        setSensorData(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getVegetableSensorData(selectedVegetable._id);
        setSensorData(data);
      } catch (e) {
        setError('Falha ao carregar sensores');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [selectedVegetable?._id]);

  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.blue}`}>
        <div className={styles.iconContainer}>
          <FaThermometerHalf className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Temperatura</div>
          <div className={styles.value}>{sensorData?.temperatura != null ? `${Math.round(sensorData.temperatura)}°C` : '—'}</div>
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
          <div className={styles.value}>{sensorData?.luminosidade != null ? `${Math.round(sensorData.luminosidade)} lux` : '—'}</div>
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
          <div className={styles.label}>Nível de Fertilizante</div>
          <div className={styles.value}>{getFertilizerLevel()}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>{getFertilizerStatus()}</span>
          </div>
        </div>
      </div>

      <div className={`${styles.card} ${styles.orange}`}>
        <div className={styles.iconContainer}>
          <FaCloudRain className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Nutrientes no Solo</div>
          <div className={styles.value}>{sensorData?.nutrientes != null ? `${Math.round(sensorData.nutrientes)}%` : '—'}</div>
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
          <div className={styles.label}>Umidade do Ar</div>
          <div className={styles.value}>{sensorData?.umidade != null ? `${Math.round(sensorData.umidade)}%` : '—'}</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Suave</span>
          </div>
        </div>
      </div>
    </div>
  );
}
