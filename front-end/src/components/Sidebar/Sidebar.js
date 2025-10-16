import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLeaf,
  faCamera,
  faFileAlt,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>G</div>

      <div className={styles.menuWrapper}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faHome} />
            <span>Início</span>
          </li>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faLeaf} />
            <span>Sensores</span>
          </li>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faCamera} />
            <span>Câmeras</span>
          </li>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faFileAlt} />
            <span>Relatórios</span>
          </li>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faCog} />
            <span>Configurações</span>
          </li>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Sair</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
