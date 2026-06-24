import styles from '../styles/Modal.module.css';

export default function ModalWrapper({ children }) {
  return (
    <div className={styles.overlay} >
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
}