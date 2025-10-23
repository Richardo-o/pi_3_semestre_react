import styles from './Alerts.module.css';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/services/api';
import { 
  FaExclamationTriangle, 
  FaThermometerHalf, 
  FaTint, 
  FaSun, 
  FaLeaf,
  FaClock,
  FaBell
} from 'react-icons/fa';

export default function Alerts() {
  const [waterLevel, setWaterLevel] = useState(null);

  useEffect(() => {
    fetchWaterLevel();
  }, []);

  const fetchWaterLevel = async () => {
    try {
      // Busca o nível global da água via API
      const response = await apiFetch('/water-level');
      setWaterLevel(response.nivel_agua);
    } catch (error) {
      console.error('Erro ao carregar nível da água:', error);
      // Fallback para valor padrão
      setWaterLevel(75);
    }
  };

  // Função para gerar alertas baseados no nível global da água
  const getWaterAlerts = () => {
    const alerts = [];

    if (waterLevel !== null) {
      if (waterLevel < 30) {
        alerts.push({
          type: 'danger',
          icon: FaTint,
          title: 'Nível de Água Crítico',
          description: `${waterLevel}L - Sistema precisa de água urgentemente`,
          time: 'Agora'
        });
      } else if (waterLevel < 50) {
        alerts.push({
          type: 'warning',
          icon: FaTint,
          title: 'Nível de Água Baixo',
          description: `${waterLevel}L - Considere reabastecer o sistema`,
          time: 'Há 2 min'
        });
      } else if (waterLevel > 150) {
        alerts.push({
          type: 'warning',
          icon: FaTint,
          title: 'Nível de Água Alto',
          description: `${waterLevel}L - Verifique drenagem do sistema`,
          time: 'Há 1 min'
        });
      } else {
        alerts.push({
          type: 'success',
          icon: FaTint,
          title: 'Nível de Água Ideal',
          description: `${waterLevel}L - Sistema funcionando perfeitamente`,
          time: 'Há 5 min'
        });
      }
    }

    // Alertas padrão do sistema
    alerts.push(
      {
        type: 'info',
        icon: FaThermometerHalf,
        title: 'Temperatura Estável',
        description: '24°C - Condições ideais',
        time: 'Há 10 min'
      },
      {
        type: 'info',
        icon: FaSun,
        title: 'Luminosidade Adequada',
        description: '800 lux - Luz suficiente',
        time: 'Há 15 min'
      }
    );

    return alerts;
  };

  const alerts = getWaterAlerts();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBell className={styles.headerIcon} />
        <h4 className={styles.title}>
          ALERTAS DO SISTEMA
        </h4>
      </div>
      
      <div className={styles.alertsList}>
        {alerts.map((alert, index) => {
          const IconComponent = alert.icon;
          return (
            <div key={index} className={`${styles.alertCard} ${styles[alert.type]}`}>
              <div className={styles.alertIcon}>
                <IconComponent className={styles.icon} />
              </div>
              <div className={styles.alertContent}>
                <div className={styles.alertTitle}>{alert.title}</div>
                <div className={styles.alertDescription}>{alert.description}</div>
                <div className={styles.alertTime}>
                  <FaClock className={styles.timeIcon} />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
