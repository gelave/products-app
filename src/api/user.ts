import { AxiosError } from 'axios';
import client from './client';

type UserCredentials = {
  email: string;
  password: string;
}


export const logIn = async ({email, password}: UserCredentials) => {
  try {
    const response = await client.post('/login', { email, password});
    console.log('login:', response);
    if (response.status === 200) {
      return response.data;
    }  
  } catch (error) {
    console.log('login error:', error);
    if (error instanceof AxiosError){
      throw new Error(error.response?.data.error);
    }
    throw new Error('Usuario o contraseña incorrectos')
  }
  
  
}