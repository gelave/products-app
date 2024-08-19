import styles from "./Modal.module.css";

export type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ title, children, open, onClose }: ModalProps) => {
  return (
    <>
      {open && (
        <div className={styles.modal}>
          <div className={styles.overlay} onClick={onClose}></div>

          <div className={styles.modalContent}>
            <div className={styles.title}>
              <h3>{title}</h3>
            </div>
            {children}           
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
