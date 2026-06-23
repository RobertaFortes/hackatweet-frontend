import styles from './ButtonTrans.module.css';
import { useState } from 'react';

function ButtonTrans({ title, onClick, textColor='#1d9bf0', backgroundColorHover='#000', textColorHover='#1d9bf0', border = '2px solid #fff', borderHover = '2px solid #fff'}) {
  
    const [isHover, setIsHover] = useState(false);
    
    return (
    <button
      className={styles.buttonTrans}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}

      style={{
        backgroundColor: isHover
        ? backgroundColorHover
        : 'transparent',
        
        color: isHover
          ? textColorHover
          : textColor,

        border: isHover
        ? borderHover
        : border,
      }}
    >
      {title}
    </button>
  );
}
export default ButtonTrans;
 