import styles from './Button.module.css';

function Button({ title, variant = 'solid', type = 'button', className, ...props }) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classNames} {...props}>
      {title}
    </button>
  );
}

export default Button;
