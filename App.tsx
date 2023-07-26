import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductsContext';

// const AppState = ({children}: {children : JSX.Element | JSX.Element[]} ) => {
//   return (
//     <AuthProvider>
//       {children}
//     </AuthProvider>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      {/* <AppState> */}
        <AuthProvider>
          <ProductProvider>
            <StackNavigator/>
          </ProductProvider>
        </AuthProvider>
      {/* </AppState> */}
    </NavigationContainer>
  );
};

export default App;
