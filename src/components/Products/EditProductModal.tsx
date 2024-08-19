import { ChangeEvent, useState } from "react";
import { Product, ProductErrorMap, ProductSchema } from "../../api/product";
import Modal from "../../shared/components/Modal/Modal";
import styles from "./EditProductModal.module.css";
import { ZodFormattedError } from "zod";

export type EditProductModalProps = {
  open: boolean;
  title: string;
  product: Product;
  onClose: () => void;
  onConfirm: (product: Product) => void;
};

const EditProductModal = ({
  open,
  title,
  product,
  onClose,
  onConfirm,
}: EditProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  const [validationErrors, setValidationErrors] = useState<
    ZodFormattedError<
      {
        name: string;
        description: string;
        price: number;
      },
      string
    >
  >();

  const updateProductData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]:
        event.target.name === "price"
          ? Number(event.target.value)
          : event.target.value,
    });
  };


  const validate = () => {    
    const result = ProductSchema.safeParse(updatedProduct, { errorMap: ProductErrorMap });
    if (!result.success) {
      const formatted = result.error.format();
      setValidationErrors(formatted);
      return;
    }
    onConfirm(updatedProduct);
  };

  return (
    <Modal title={title} onClose={onClose} open={open}>
      <div>
        <div className={styles.formRow}>
          <label>Nombre: </label>
          <input
            type="text"
            name="name"
            value={updatedProduct.name}
            onChange={updateProductData}
          />
          {validationErrors?.name && (
            <small className={styles.error}>
              {validationErrors?.name?._errors.join(",")}
            </small>
          )}
        </div>
        <div className={styles.formRow}>
          <label>Descripción: </label>
          <textarea
            name="description"
            onChange={updateProductData}
            value={updatedProduct.description}
          />
          {validationErrors?.description && (
            <small className={styles.error}>
              {validationErrors?.description?._errors.join(",")}
            </small>
          )}
        </div>
        <div className={styles.formRow}>
          <label>Precio: </label>
          <input
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={updateProductData}
          />
          {validationErrors?.price && (
            <small className={styles.error}>
              {validationErrors?.price?._errors.join(",")}
            </small>
          )}
        </div>
        <div className={styles.modalToolbar}>
          <div className={styles.buttonsContainer}>
            <button onClick={onClose}>Cancel</button>
            <button
              className={["primary", styles.saveButton].join(" ")}
              onClick={() => validate()}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
