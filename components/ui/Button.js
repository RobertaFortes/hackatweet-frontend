import styles from './Button.module.css';

function Button({ title, onClick, variant = 'button' }) {
    return (
        <button
            className={`${styles.default} ${styles[variant]}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}
export default Button;