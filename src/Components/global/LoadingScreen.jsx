import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={styles.loadingScreenContainer}>
      <div className={styles.content}>
        <h1 className={styles.name}>Simran Nagekar</h1>
        <div className={styles.loadingBarContainer}>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
    </div>
  );
}
