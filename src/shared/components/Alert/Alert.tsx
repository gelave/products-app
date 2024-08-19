import styles from "./Alert.module.css";

export type AlertProps = {
  message: string;
  variant: 'info' | 'error'
}

const Alert = ({ message, variant}: AlertProps) => {
  const alertStyles = [styles.alert];
  switch (variant) {
    case 'info':
      alertStyles.push(styles.info)
      break;
    case 'error':
      alertStyles.push(styles.error)
      break;
    default:
      break;
  }

  return <div className={alertStyles.join(' ')} role="alert">
    <p>{message}</p>
  </div>;
};

export default Alert;
