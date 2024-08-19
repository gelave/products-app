import styles from  './EmptyState.module.css';

export type EmptyStateProps = {
  
  children?: React.ReactNode;
}

const EmptyState = ({children}: EmptyStateProps) => {
  return (
  <div className={styles.emptyState}>
    <div className={styles.contentContainer}>
      {children}
    </div>
    
  </div>)
}

export default EmptyState;