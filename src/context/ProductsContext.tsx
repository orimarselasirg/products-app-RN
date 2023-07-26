
import React, { createContext, useState, useEffect } from 'react';
import { Producto, ProductsResponse } from '../interfaces/ProductsInterfaces';
import { Asset, ImagePickerResponse} from 'react-native-image-picker';
import productApi from '../api/storeApi';
import { Platform } from 'react-native';
import { cafeFetch } from '../api/apiFetch';

type ProductContextProps = {
  products: Producto[];
  createProduct: (categoryId: string, productName: string)=> Promise<Producto>;
  updateProduct: (categoryId: string, productName: string, productId: string)=> Promise<Producto>;
  deleteProduct: (productId: string)=> Promise<Producto>;
  getProducts: ()=> Promise<void>;
  getProductsById: (productId: string)=> Promise<Producto>;
  uploadImage: (file:ImagePickerResponse, productId: string, ) => Promise<void>
}

export const ProductContext = createContext({} as ProductContextProps);


export const ProductProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  useEffect(()=> {
    getProducts();
  },[]);


  const createProduct = async (categoryId: string, productName: string):Promise<Producto>=> {
   try {
     const {data} = await productApi.post<Producto>('/productos',{categoria: categoryId, nombre: productName} );
     setProducts([...products, data]);
     return data;
   } catch (error: any) {
      console.log(error);
      return error;
   }
  };
  const updateProduct = async (categoryId: string, productName: string, productId: string): Promise<Producto>=> {
    try {
      const {data} = await productApi.put(`/productos/${productId}`,{categoria: categoryId, nombre: productName} );
      setProducts(products.map(e => e._id === productId ? data : e));
      return data;
    } catch (error: any) {
      console.log(error);
      return error;
   }
  };
  const deleteProduct = async (productId: string):Promise<Producto>=> {
    try {
      const {data} = await productApi.delete<Producto>(`/productos/${productId}`);
      setProducts(products.filter(e => e._id !== productId));
      return data;
    } catch (error:any) {
      console.log(error);
      return error;
    }

  };
  const getProducts = async ()=> {
    try {
      const {data} = await productApi.get<ProductsResponse>('/productos?limite=100');
      setProducts([...data.productos]);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductsById = async (productId: string):Promise<Producto> => {
    try {
      const {data} = await productApi.get<Producto>(`/productos/${productId}`);
      return data;
    } catch (error: any) {
      return error;
    }
  };
  // const uploadImage = async (productId: string, data: ImagePickerResponse) => {
  //   // const params = {
  //   //   uri: data.assets![0].uri,
  //   //   type: data.assets![0].type,
  //   //   name: data.assets![0].fileName,
  //   // };
  //   const params = {
  //         name: data.assets![0].fileName!,
  //         type: data.assets![0].type!,
  //         uri: Platform.OS === 'ios' ? data.assets![0].uri!.replace('file://', '') : data.assets![0].uri!,
  //       };

  //   const fileToUpload = JSON.parse(JSON.stringify(params));
  //   const formData = new FormData();
  //   formData.append('archivo', fileToUpload);
  //   // console.log(JSON.stringify(productId, null, 2));
  //   try {
  //     const res = await productApi.put(`/uploads/productos/${productId}`, formData, {
  //             headers:{
  //               // 'Access-Control-Allow-Origin': '*',
  //               // 'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
  //               // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
  //               // 'Accept': 'multipart/form-data',
  //               'Content-Type':'multipart/form-data',
  //              },
  //           } );
  //     console.log(res);
  //   } catch (error:any) {
  //     console.log(error);
  //   }
  // };

  const uploadImage = async (data: ImagePickerResponse, productId: string, ) => {
    const params = {
      name: data.assets![0].fileName!,
      type: data.assets![0].type!,
      uri: Platform.OS === 'ios' ? data.assets![0].uri!.replace('file://', '') : data.assets![0].uri!,
    };
    const fileToUpload = JSON.parse(JSON.stringify(params));

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      const res = await productApi.put(`/uploads/productos/${productId}`, formData, {
        headers:{
          Accept: 'application/json',
          'Content-Type':'multipart/form-data',
         },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

//   const uploadImage = async (file: ImagePickerResponse, productId: string) => {
//     const fileToUpload = {
//         uri: file.assets![0].uri,
//         type: file.assets![0].type,
//         name: file.assets![0].fileName,
//     };

//     const formData = new FormData();
//     formData.append('archivo', fileToUpload);

//     console.log(formData);

//     try {
//         const resp = await cafeFetch(`uploads/productos/${ productId }`, 'PUT', 'multipart/form-data', formData).then(res => res.json());
//         console.log(resp);
//     }
//     catch (error: any) {
//         console.log(error);
//     }
// };

  return (
    <ProductContext.Provider value={{
      products,
      createProduct,
      updateProduct,
      deleteProduct,
      getProducts,
      getProductsById,
      uploadImage,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
