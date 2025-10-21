// components/Sidebar/Sidebar.tsx
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLeaf,
  faCamera,
  faFileAlt,
  faCog,
  faSignOutAlt,
  faList
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>G</div>

      <nav className={styles.menuWrapper} aria-label="Menu principal">
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faHome} />
            <Link href="/" className={styles.link}>Início</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faLeaf} />
            <Link href="/growVegetable" className={styles.link}>Adicionar Hortaliça</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faList} />
            <Link href="/vegetableList" className={styles.link}>Lista de Hortaliças</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faCamera} />
            <Link href="/cameras" className={styles.link}>Câmeras</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faFileAlt} />
            <Link href="/reports" className={styles.link}>Relatórios</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faCog} />
            <Link href="/settings" className={styles.link}>Configurações</Link>
          </li>

          <li className={styles.menuItem}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <Link href="/logout" className={styles.link}>Sair</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
