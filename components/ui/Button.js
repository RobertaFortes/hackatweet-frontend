import styles from './Button.module.css';
import { useState } from 'react';

const VARIANTS = {
  solid: {
    backgroundColor: '#1d9bf0',
    textColor: '#fff',
    backgroundColorHover: '#176fab',
    textColorHover: '#fff',
    border: 'none',
    borderHover: '2px solid #1d9bf0',
  },
  transparent: {
    backgroundColor: 'transparent',
    textColor: '#1d9bf0',
    backgroundColorHover: '#000',
    textColorHover: '#1d9bf0',
    border: '2px solid #fff',
    borderHover: '2px solid #fff',
  },
};

function Button({ title, onClick, variant = 'solid', ...overrides }) {
  const [isHover, setIsHover] = useState(false);

  const {
    backgroundColor,
    textColor,
    backgroundColorHover,
    textColorHover,
    border,
    borderHover,
  } = { ...VARIANTS[variant], ...overrides };

  return (
    <button
      className={styles.button}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? backgroundColorHover : backgroundColor,
        color: isHover ? textColorHover : textColor,
        border: isHover ? borderHover : border,
      }}
    >
      {title}
    </button>
  );
}

export default Button;
