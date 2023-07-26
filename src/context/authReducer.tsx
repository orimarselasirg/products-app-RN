import { Usuario } from '../interfaces/AuthInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type authAction =
| {type: 'signUp', payload: {token: string, user: Usuario}}
| {type: 'addError', payload: string}
| {type: 'removeError'}
| {type: 'notAuthenticated'}
| {type: 'logout'}

export const authReducer = (state: AuthState, action: authAction): AuthState => {
  switch (action.type) {
    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
};
