import styles from './RecentReports.module.css';

export default function RecentReports() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>RELATÓRIOS RECENTES</h4>
      <table className={styles.reportTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Data</th>
            <th className={styles.tableHeader}>Tipo</th>
            <th className={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tableCell}>2020/12/29</td>
            <td className={styles.tableCell}>Rel.1</td>
            <td className={styles.tableCell}>OK</td>
          </tr>
          <tr>
            <td className={styles.tableCell}>2020/12/30</td>
            <td className={styles.tableCell}>Rel.2</td>
            <td className={styles.tableCell}>Pend.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
