import styles from './CameraPreview.module.css';
import { 
  FaVideo, 
  FaCamera, 
  FaPlay, 
  FaPause, 
  FaExpand,
  FaDownload,
  FaEye,
  FaCog
} from 'react-icons/fa';

export default function CameraPreview({ selectedVegetable }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <FaVideo className={styles.headerIcon} />
          </div>
          <div className={styles.headerContent}>
            <h4 className={styles.title}>
              CÂMERAS
              {selectedVegetable && (
                <span className={styles.vegetableName}>
                  - {selectedVegetable.nome_hortalica}
                </span>
              )}
            </h4>
            <div className={styles.subtitle}>
              <FaEye className={styles.subtitleIcon} />
              <span>
                {selectedVegetable ? 
                  `Monitorando ${selectedVegetable.nome_hortalica}` : 
                  'Monitoramento em tempo real'
                }
              </span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.settingsButton}>
            <FaCog className={styles.settingsIcon} />
          </button>
        </div>
      </div>
      
      <div className={styles.cameras}>
        <div className={styles.cameraBox}>
          <div className={styles.cameraHeader}>
            <div className={styles.cameraInfo}>
              <FaCamera className={styles.cameraIcon} />
              <span className={styles.cameraName}>Câmera Principal</span>
            </div>
            <div className={styles.cameraStatus}>
              <div className={styles.statusDot}></div>
              <span>Online</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src="https://s2-oglobo.glbimg.com/CV9ysWLW93UyAjdbFd4uvxsRNcQ=/0x0:1296x864/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/X/x/sqFAM3Ra6BFwwWdRBl1A/99846016-brasil-sao-paulo-sp-13-07-2022-pink-farms-fazenda-vertical-de-producao-de-alime.jpg" alt="cam1" className={styles.cameraImage} />
            <div className={styles.imageOverlay}>
              <button className={styles.playButton}>
                <FaPlay className={styles.playIcon} />
              </button>
            </div>
          </div>
          <div className={styles.cameraActions}>
            <button className={styles.actionButton}>
              <FaCamera className={styles.actionIcon} />
              <span>Capturar</span>
            </button>
            <button className={styles.actionButton}>
              <FaDownload className={styles.actionIcon} />
              <span>Download</span>
            </button>
            <button className={styles.actionButton}>
              <FaExpand className={styles.actionIcon} />
              <span>Expandir</span>
            </button>
          </div>
        </div>
        
        <div className={styles.cameraBox}>
          <div className={styles.cameraHeader}>
            <div className={styles.cameraInfo}>
              <FaCamera className={styles.cameraIcon} />
              <span className={styles.cameraName}>Câmera Secundária</span>
            </div>
            <div className={styles.cameraStatus}>
              <div className={styles.statusDot}></div>
              <span>Online</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src="https://campoenegocios.com/wp-content/uploads/2021/10/Fazenda-1-1.jpg" alt="cam2" className={styles.cameraImage} />
            <div className={styles.imageOverlay}>
              <button className={styles.playButton}>
                <FaPlay className={styles.playIcon} />
              </button>
            </div>
          </div>
          <div className={styles.cameraActions}>
            <button className={styles.actionButton}>
              <FaCamera className={styles.actionIcon} />
              <span>Capturar</span>
            </button>
            <button className={styles.actionButton}>
              <FaDownload className={styles.actionIcon} />
              <span>Download</span>
            </button>
            <button className={styles.actionButton}>
              <FaExpand className={styles.actionIcon} />
              <span>Expandir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
