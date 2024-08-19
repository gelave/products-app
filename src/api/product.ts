import { AxiosError } from "axios";
import client from "./client";

export type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  created_at?: Date;
  updated_at?: Date;
};

export type ModalPayload = {
  open: boolean;
  product: Product | undefined;
};

export const listProducts = async () => {
  try {
    const response = await client.get("/products");
    return response.data;
  } catch (error) {
    console.log('listProducts error:', error)
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const createProduct = async (product: Product) => {
  try {
    const response = await client.post("/products", product);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }
  }
};

export const updateProduct = async (product: Product) => {
  try {
    if (product.id){
      const response = await client.put("/products/", product);
      return response.data;
    }
    throw Error('Identificador de producto invalido');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }
  }
};

export const deleteProduct = async (product: Product) => {
  try {
    if (product.id){
      const response = await client.delete("/products/" + product.id);
      return response.data;
    }
    throw Error('Identificador de producto invalido');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }
  }
};

