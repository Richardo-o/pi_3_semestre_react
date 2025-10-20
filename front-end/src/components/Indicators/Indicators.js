import styles from './Indicators.module.css';
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
  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.blue}`}>
        <div className={styles.iconContainer}>
          <FaThermometerHalf className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Temperatura</div>
          <div className={styles.value}>24°C</div>
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
          <div className={styles.label}>Umidade</div>
          <div className={styles.value}>70%</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Perfeita</span>
          </div>
        </div>
      </div>
      
      <div className={`${styles.card} ${styles.yellow}`}>
        <div className={styles.iconContainer}>
          <FaSun className={styles.icon} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Luminosidade</div>
          <div className={styles.value}>800 lux</div>
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
          <div className={styles.label}>Precipitação</div>
          <div className={styles.value}>2.5mm</div>
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
          <div className={styles.label}>Vento</div>
          <div className={styles.value}>12 km/h</div>
          <div className={styles.status}>
            <FaCheckCircle className={styles.statusIcon} />
            <span>Suave</span>
          </div>
        </div>
      </div>
    </div>
  );
}
