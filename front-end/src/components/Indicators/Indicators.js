import styles from './Indicators.module.css';

export default function Indicators() {
  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.blue}`}>
        <div className={styles.label}>Temperatura</div>
        <div className={styles.value}>24°C</div>
        <div className={styles.status}>OK</div>
      </div>
      <div className={`${styles.card} ${styles.green}`}>
        <div className={styles.label}>Umidade</div>
        <div className={styles.value}>70%</div>
        <div className={styles.status}>OK</div>
      </div>
      <div className={`${styles.card} ${styles.yellow}`}>
        <div className={styles.label}>Luminosidade</div>
        <div className={styles.value}>800 lux</div>
        <div className={styles.status}>OK</div>
      </div>
    </div>
  );
}
