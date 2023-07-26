import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProductsScreen } from '../Screens/ProductsScreen';
import { ProductScreen } from '../Screens/ProductScreen';

export type ProductStackParams = {
  ProductsScreen: undefined,
  ProductScreen: {id?: string, name?: string}
}

const Stack = createStackNavigator<ProductStackParams>();

export const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle:{
          backgroundColor: 'white',
        },
        headerStyle:{
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    >
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: 'Listado de Productos'}}/>
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{title: 'Producto'}}/>
    </Stack.Navigator>
  );
};
