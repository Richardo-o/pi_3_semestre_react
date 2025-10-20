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

export default function Alerts() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaBell className={styles.headerIcon} />
        <h4 className={styles.title}>ALERTAS</h4>
      </div>
      
      <div className={styles.alertsList}>
        <div className={`${styles.alertCard} ${styles.warning}`}>
          <div className={styles.alertIcon}>
            <FaTint className={styles.icon} />
          </div>
          <div className={styles.alertContent}>
            <div className={styles.alertTitle}>Baixa Umidade</div>
            <div className={styles.alertDescription}>Nível abaixo de 40%</div>
            <div className={styles.alertTime}>
              <FaClock className={styles.timeIcon} />
              <span>Há 5 min</span>
            </div>
          </div>
        </div>
        
        <div className={`${styles.alertCard} ${styles.danger}`}>
          <div className={styles.alertIcon}>
            <FaThermometerHalf className={styles.icon} />
          </div>
          <div className={styles.alertContent}>
            <div className={styles.alertTitle}>Temperatura Elevada</div>
            <div className={styles.alertDescription}>Acima de 30°C</div>
            <div className={styles.alertTime}>
              <FaClock className={styles.timeIcon} />
              <span>Há 12 min</span>
            </div>
          </div>
        </div>

        <div className={`${styles.alertCard} ${styles.info}`}>
          <div className={styles.alertIcon}>
            <FaSun className={styles.icon} />
          </div>
          <div className={styles.alertContent}>
            <div className={styles.alertTitle}>Luz Insuficiente</div>
            <div className={styles.alertDescription}>Menos de 500 lux</div>
            <div className={styles.alertTime}>
              <FaClock className={styles.timeIcon} />
              <span>Há 1 hora</span>
            </div>
          </div>
        </div>

        <div className={`${styles.alertCard} ${styles.success}`}>
          <div className={styles.alertIcon}>
            <FaLeaf className={styles.icon} />
          </div>
          <div className={styles.alertContent}>
            <div className={styles.alertTitle}>Crescimento Ótimo</div>
            <div className={styles.alertDescription}>Taxa de crescimento ideal</div>
            <div className={styles.alertTime}>
              <FaClock className={styles.timeIcon} />
              <span>Há 2 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
