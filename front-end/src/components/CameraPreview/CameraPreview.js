import styles from './CameraPreview.module.css';

export default function CameraPreview() {
  return (
    <div className={styles.container}>
      <h4>CÂMERAS - VISUALIZAÇÃO RÁPIDA</h4>
      <div className={styles.cameras}>
        <div className={styles.cameraBox}>
          <img src="https://picsum.photos/100/100?1" alt="cam1" className={styles.cameraImage} />
          <button className={styles.captureButton}>Capturar Foto</button>
        </div>
        <div className={styles.cameraBox}>
          <img src="https://picsum.photos/100/100?2" alt="cam2" className={styles.cameraImage} />
          <button className={styles.captureButton}>Capturar Foto</button>
        </div>
      </div>
    </div>
  );
}
