import { useEffect, useState } from "react";
import { getTrends } from '../../services/tweets';
import styles from '../../styles/Home.module.css';

function Trend({trend, onClick }) {
  
  return (
    <div>
      <div className={styles.trend} onClick={() => onClick(trend._id)}>
          <p className={styles.trendName}>#{trend._id}</p>
          <small className={styles.trendCount}>{trend.count} Trend{trend.count >1 ? 's':''}</small>
      </div>
    </div>
  );
}

export default Trend;