import styles from './ConfettiRain.module.css';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

const ConfettiRain = () => {
  const [isRaining, setIsRaining] = useState(true); // Set to true by default

  useEffect(() => {
    // You can remove the check for reload, and always set isRaining to true
    setIsRaining(true);

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
