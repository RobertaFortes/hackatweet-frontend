import { useEffect, useState } from "react";
import { getTrends } from '../../services/tweets';
import styles from '../../styles/Home.module.css';

function Trend({trend}) {
  
  return (
    <div>
      <div className={styles.trend}>
          <p>#{trend._id}</p>
          <small>{trend.count} Trends</small>
      </div>
    </div>
  );
}

export default Trend;