import styles from './Alerts.module.css';

export default function Alerts() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>ALERTAS</h4>
      <div className={styles.alertCard}>⚠️ Baixa Umidade</div>
      <div className={styles.alertCard}>⚠️ Temperatura Elevada</div>
    </div>
  );
}
