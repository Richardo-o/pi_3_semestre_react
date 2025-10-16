import styles from './SensorDetails.module.css';

export default function SensorDetails() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>DETALHES DOS SENSORES</h4>
      <p className={styles.detailItem}>Temp: 24°C - OK</p>
      <p className={styles.detailItem}>Umidade: 70% - OK</p>
      <p className={styles.detailItem}>Solo: 500 - OK</p>
    </div>
  );
}
