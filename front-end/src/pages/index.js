import styles from '@/styles/Home.module.css';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import GrowthChart from '@/components/GrowthChart/GrowthChart';
import Indicators from '@/components/Indicators/Indicators';
import Alerts from '@/components/Alerts/Alerts';
import CameraPreview from '@/components/CameraPreview/CameraPreview';
import SensorDetails from '@/components/SensorDetails/SensorDetails';
import RecentReports from '@/components/RecentReports/RecentReports';

export default function Home() {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContent}>
        <Header />
        <div className={styles.top}>
          <div className={styles.chartArea}>
            <GrowthChart />
          </div>
          <div className={styles.rightColumn}>
            <Indicators />
            <Alerts />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.tile}><CameraPreview /></div>
          <div className={styles.tile}><SensorDetails /></div>
          <div className={styles.tile}><RecentReports /></div>
        </div>
      </main>
    </div>
  );
}
