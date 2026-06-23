import styles from './Button.module.css';
import { useState } from 'react';

function Button({ title, onClick, backgroundColor ='#1d9bf0', textColor='#fff', backgroundColorHover='#176fab', textColorHover='#fff', borderHover = '2px solid #1d9bf0'}) {
  
    const [isHover, setIsHover] = useState(false);
    
    return (
    <button
      className={styles.button}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}

      style={{
        backgroundColor: isHover
        ? backgroundColorHover
        : backgroundColor,
        
        color: isHover
          ? textColorHover
          : textColor,

        border: isHover
        ? borderHover
        : 'none',
      }}
    >
      {title}
    </button>
  );
}
export default Button;