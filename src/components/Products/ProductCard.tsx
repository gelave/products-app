import { Product } from "../../api/product";
import styles from "./ProductCard.module.css";

export type ProductCardProps = {
  product: Product;
  onDelete: () => void;
  onEdit: () => void;
};

const ProductCard = ({ product, onDelete, onEdit }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.thumbnail}
        style={{
          backgroundColor: "gray",
          backgroundImage: `url('${product.thumbnail}')`,
          backgroundSize: "cover",
        }}
      >
        <div className={styles.toolbar}>
          <button onClick={onEdit}>Editar</button>
          <button className={styles.deleteButton} onClick={onDelete}>Borrar</button>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{product.name}</h4>
        <div className={styles.descriptionContainer}>
          <p className={styles.cardDescription} title={product.description}>
            {product.description}
          </p>
        </div>
        <p>
          <strong className={styles.label}>Precio: </strong>$
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
