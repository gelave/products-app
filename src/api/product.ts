import { AxiosError } from "axios";
import client from "./client";
import { z } from 'zod';

export type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  created_at?: Date;
  updated_at?: Date;
};

export const ProductSchema =  z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.number().gt(0),
});

const fieldTranslation: { [key: string]: string } = {
  name: "Nombre",
  description: "Descripción",
  price: "Precio",
};


export const ProductErrorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === "string") {
        return { message: "No es una cadena valida" };
      }
      if (error.expected === "number") {
        return { message: "No es un numero valido" };
      }
      break;
    case z.ZodIssueCode.too_small:
      if (error.type === "string") {
        return {
          message: `${
            fieldTranslation[error.path[0]] ?? error.path[0]
          } debe tener al menos 1 caracter`,
        };
      }
      if (error.type === "number") {
        return {
          message: `${
            fieldTranslation[error.path[0]] ?? error.path[0]
          } debe ser mayor a 0`,
        };
      }
      break;
  }

  return { message: ctx.defaultError };
};

export type ModalPayload = {
  open: boolean;
  product: Product | undefined;
};

export const listProducts = async (page:number = 1) => {
  try {
    const response = await client.get(`/products?page=${page}`);
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

