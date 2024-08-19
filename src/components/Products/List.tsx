import { useEffect, useState } from "react";
import {
  ModalPayload,
  Product,
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../../api/product";

import Alert from "../../shared/components/Alert/Alert";
import styles from "./List.module.css";
import ProductCard from "./ProductCard";
import EmptyState from "../../shared/components/EmptyState/EmptyState";
import ConfirmationModal from "../../shared/components/Modal/ConfirmationModal";
import EditProductModal from "./EditProductModal";
import TopMenu from "../../shared/components/Menu/TopMenu";

const List = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [deleteConfirm, setDeleteConfirm] = useState<ModalPayload>({
    open: false,
    product: undefined,
  });
  const [editModal, setEditModal] = useState<ModalPayload>({
    open: false,
    product: undefined,
  });

  const [createModal, setCreateModal] = useState<ModalPayload>({
    open: false,
    product: undefined,
  });

  const DEFAULT_PRODUCT: Product = {
    name: "",
    description: "",
    price: 0,
    thumbnail: `https://picsum.photos/seed/${Math.random()}/200/300`,
  };

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const productList = await listProducts();
      setProducts(productList);
    } catch (error) {
      if (error instanceof Error) {
        console.log("error:", error);
        setError(error.message);
      }
    }
  };

  const onCreateProduct = async (product: Product) => {
    const response = await createProduct(product);
    console.log("response:", response);
    setCreateModal({ open: false, product: undefined });
    getProductList();
  };

  const onDeleteProduct = async (product: Product) => {
    const response = await deleteProduct(product);
    console.log("delete response:", response);
    setDeleteConfirm({ open: false, product: undefined });
    getProductList();
  };

  const onUpdateProduct = async (product: Product) => {
    const response = await updateProduct(product);
    console.log("update response:", response);
    setEditModal({ open: false, product: undefined });
    getProductList();
  };

  return (
    <>
      <TopMenu/>
      <div className={styles.productList}>
        <div className={styles.productTitle}>
          <div className="flex-grid">
            <div className="col">
              <h2>Lista de productos</h2>
            </div>
            <div className={["col", styles.createButton].join(" ")}>
              <button onClick={() => setCreateModal({open: true, product: DEFAULT_PRODUCT})}>
                Crear Producto
              </button>
            </div>
          </div>
        </div>
        {error && <Alert message={error} variant="error" />}
        {!products.length && (
          <EmptyState>
            <p>No existen productos. Comienza creando uno</p>
            <p>
              <button onClick={() => setCreateModal({open: true, product: DEFAULT_PRODUCT})}>
                Crear Producto
              </button>
            </p>
          </EmptyState>
        )}
        <div className={styles.productGrid}>
          {products &&
            products.map((product, index) => (
              <div className="col" key={index}>
                <ProductCard
                  product={product}
                  onDelete={() => {
                    setDeleteConfirm({ open: true, product: product });
                  }}
                  onEdit={() => {
                    setEditModal({ open: true, product: product });
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <ConfirmationModal
        title="Borrar producto"
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, product: undefined })}
        onConfirm={() => {
          if (deleteConfirm.product) {
            onDeleteProduct(deleteConfirm.product);
          }
        }}
      >
        <p>
          Estas seguro de eliminar este producto "{deleteConfirm.product?.name}{" "}
          - ${deleteConfirm.product?.price}"?
        </p>
      </ConfirmationModal>

      {editModal.product && (
        <EditProductModal
          title="Editar producto"
          open={editModal.open}
          product={editModal.product}
          onClose={() => setEditModal({ open: false, product: undefined })}
          onConfirm={(updatedProduct: Product) => {
            onUpdateProduct(updatedProduct);
          }}
        />
      )}

      {createModal.product && (
        <EditProductModal
          title="Crear producto"
          open={createModal.open}
          product={createModal.product}
          onClose={() => setCreateModal({ open: false, product: undefined })}
          onConfirm={(updatedProduct: Product) => {
            onCreateProduct(updatedProduct);
          }}
        />
      )}
    </>
  );
};

export default List;
