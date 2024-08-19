import { ChangeEvent, useState } from "react";
import { Product } from "../../api/product";
import Modal from "../../shared/components/Modal/Modal";
import styles from './EditProductModal.module.css'

export type EditProductModalProps = {
  open: boolean;
  title: string;
  product: Product;
  onClose: () => void;
  onConfirm: (product: Product) => void;
};

const EditProductModal = ({open, title, product, onClose, onConfirm}: EditProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const updateProductData = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    console.log(event);
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value
    })
  }

  return (<Modal title={title} onClose={onClose} open={open}>
    <div>
      <div className={styles.formRow}>
        <label>Nombre: </label>
        <input type="text" name="name" value={updatedProduct.name} onChange={updateProductData}/>
      </div>
      <div className={styles.formRow}>
        <label>Descripción: </label>
        <textarea name="description" onChange={updateProductData} value={updatedProduct.description}/>
      </div>
      <div className={styles.formRow}>
        <label>Precio: </label>
        <input type="text" name="price" value={updatedProduct.price} onChange={updateProductData}/>
      </div>
      <div className={styles.modalToolbar}>
        <div className={styles.buttonsContainer}>
          <button onClick={onClose}>Cancel</button>
          <button className={['primary', styles.saveButton].join(' ')} onClick={() => onConfirm(updatedProduct)}>Salvar</button>
        </div>
      </div>
    </div>
  </Modal>)
};

export default EditProductModal;