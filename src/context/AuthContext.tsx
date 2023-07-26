import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse, RegisterData, Usuario, loginData } from '../interfaces/AuthInterfaces';
import { AuthState, authReducer } from './authReducer';
import productApi from '../api/storeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated'
  signUp: (data: RegisterData)=>void;
  signIn: (data: loginData)=>void;
  logOut: ()=>void;
  removeError: ()=>void;
}


const AuthInitialState: AuthState = {
  errorMessage: '',
  status: 'checking',
  token: null,
  user: null,
};
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

  useEffect(()=> {
    checkToken();
  },[]);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('@token');

    //cuando no hay token
    if (!token) {
      console.log('entre');
      return dispatch({type:'notAuthenticated'});
    }

    //cuando hay token
    const res = await productApi.get('/auth');
    console.log({res});
    if (res.status !== 200){
      return dispatch({type:'notAuthenticated'});
    }
    await AsyncStorage.setItem('@token', res.data.token);
    dispatch({type: 'signUp', payload:{token: res.data.token, user: res.data.usuario}});
  };

  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  console.log(state);

  const signIn = async(loginDataAuth: loginData) => {
    try {
      const {data} = await productApi.post<LoginResponse>('auth/login', loginDataAuth);
      dispatch({type: 'signUp', payload:{token: data.token, user: data.usuario}});
      await AsyncStorage.setItem('@token', data.token);
    } catch (error: any) {
      // console.log(error.response.data.msg);
      dispatch({type: 'addError', payload: error.response.data.msg || 'Información incorrecta'});
    }
  };
  const signUp = async (registerData: RegisterData) => {
    try {
      const {data} = await productApi.post<LoginResponse>('/usuarios', registerData);
      dispatch({type: 'signUp', payload:{token: data.token, user: data.usuario}});
      await AsyncStorage.setItem('@token', data.token);
    } catch (error: any) {
      // console.log(JSON.stringify(error.response, null, 2));
      dispatch({type: 'addError', payload: error.response.data.errors[0].msg || 'Registro incorrecto'});
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('@token');
    dispatch({type: 'logout'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

