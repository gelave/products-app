import Modal from "./Modal"
import styles from './ConfirmationModal.module.css';

export type ConfirmationModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal = ({open, title, children, onClose, onConfirm}: ConfirmationModalProps) => {
  return (<Modal title={title} onClose={onClose} open={open}>
    {children}
     <div className={styles.modalToolbar}>
      <div className={styles.buttonsContainer}>
      <button onClick={onClose}>Cancelar</button>
      <button className={['primary', styles.saveButton].join(' ')} onClick={onConfirm}>Borrar</button>

      </div>
    </div>
  </Modal>)
};

export default ConfirmationModal;