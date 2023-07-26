import { Producto } from '../interfaces/ProductsInterfaces';

export  interface productState {
  products: Producto;
  token: string;
  errorMessage: string;
}

type ProductAction =
  | {type: 'addProduct', payload: {categoryId: string, productName: string}}
  | {type: 'modifyProduct', payload: {nombre: string, id: string}}
  | {type: 'deleteProduct', payload: {id: string}}


export const productReducer = (state:productState, action: ProductAction ) => {
  switch (action.type) {
    case 'addProduct':
      return {
        ...state,
        products: action.payload.product,
        errorMessage: '',
      };
    case 'modifyProduct':
      return {
        ...state,
        nombre: action.payload.nombre,
        errorMessage: '',
      };
    case 'deleteProduct':
      return {
        ...state,
        products: action.payload.produc,
      };
    default:
      return state;
  }
};
