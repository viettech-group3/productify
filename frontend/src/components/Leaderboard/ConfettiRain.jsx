import styles from './ConfettiRain.module.css';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

const ConfettiRain = () => {
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    const isReloaded =
      performance.navigation.type === performance.navigation.TYPE_RELOAD;
    setIsRaining(isReloaded);

    const timeout = setTimeout(() => {
      setIsRaining(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={styles.confettiContainer}>
      {isRaining && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
};

export default ConfettiRain;
