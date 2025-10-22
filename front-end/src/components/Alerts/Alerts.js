import styles from './Alerts.module.css';
import { 
  FaExclamationTriangle, 
  FaThermometerHalf, 
  FaTint, 
  FaSun, 
  FaLeaf,
  FaClock,
  FaBell
} from 'react-icons/fa';

export default function Alerts({ selectedVegetable }) {
  // Função para gerar alertas baseados na hortaliça selecionada
  const getVegetableAlerts = () => {
    if (!selectedVegetable) {
      return [
        {
          type: 'warning',
          icon: FaTint,
          title: 'Baixa Umidade',
          description: 'Nível abaixo de 40%',
          time: 'Há 5 min'
        },
        {
          type: 'danger',
          icon: FaThermometerHalf,
          title: 'Temperatura Elevada',
          description: 'Acima de 30°C',
          time: 'Há 12 min'
        },
        {
          type: 'info',
          icon: FaSun,
          title: 'Luz Insuficiente',
          description: 'Menos de 500 lux',
          time: 'Há 1 hora'
        },
        {
          type: 'success',
          icon: FaLeaf,
          title: 'Crescimento Ótimo',
          description: 'Taxa de crescimento ideal',
          time: 'Há 2 horas'
        }
      ];
    }

    const alerts = [];
    
    // Alerta baseado no nível de água
    if (selectedVegetable.nivel?.nivel_agua) {
      const waterLevel = selectedVegetable.nivel.nivel_agua;
      if (waterLevel < 30) {
        alerts.push({
          type: 'danger',
          icon: FaTint,
          title: 'Nível de Água Crítico',
          description: `${waterLevel}% - ${selectedVegetable.nome_hortalica} precisa de água`,
          time: 'Agora'
        });
      } else if (waterLevel < 50) {
        alerts.push({
          type: 'warning',
          icon: FaTint,
          title: 'Nível de Água Baixo',
          description: `${waterLevel}% - Considere regar ${selectedVegetable.nome_hortalica}`,
          time: 'Há 2 min'
        });
      } else if (waterLevel > 90) {
        alerts.push({
          type: 'warning',
          icon: FaTint,
          title: 'Nível de Água Alto',
          description: `${waterLevel}% - Verifique drenagem`,
          time: 'Há 1 min'
        });
      }
    }

    // Alerta baseado no tempo de crescimento
    if (selectedVegetable.tempo_estimado && selectedVegetable.tempo_real) {
      const progress = (selectedVegetable.tempo_real / selectedVegetable.tempo_estimado) * 100;
      if (progress >= 90) {
        alerts.push({
          type: 'success',
          icon: FaLeaf,
          title: 'Pronto para Colheita',
          description: `${selectedVegetable.nome_hortalica} atingiu ${Math.round(progress)}% do crescimento`,
          time: 'Há 5 min'
        });
      }
    }

    // Se não há alertas específicos, mostrar alertas padrão
    if (alerts.length === 0) {
      alerts.push({
        type: 'info',
        icon: FaLeaf,
        title: 'Crescimento Normal',
        description: `${selectedVegetable.nome_hortalica} está se desenvolvendo bem`,
        time: 'Há 10 min'
      });
    }

    return alerts;
  };

  const alerts = getVegetableAlerts();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBell className={styles.headerIcon} />
        <h4 className={styles.title}>
          ALERTAS
          {selectedVegetable && (
            <span className={styles.vegetableName}> - {selectedVegetable.nome_hortalica}</span>
          )}
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
