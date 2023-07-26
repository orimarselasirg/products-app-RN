import { useState, useEffect } from 'react';
import { Categoria, Categories } from '../interfaces/CategoryInterfaces';
import productApi from '../api/storeApi';

export const useCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cateogories, setCategories] = useState<Categoria[]>([]);

  useEffect(()=>{
    getCategories();
  },[]);


  const getCategories = async () => {
    try {
      const {data} = await productApi.get<Categories>('/categorias');
      setCategories(data.categorias);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  return {
    cateogories,
    isLoading,
  };
};
