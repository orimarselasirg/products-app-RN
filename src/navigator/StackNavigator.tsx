import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { RegisterScreen } from '../Screens/RegisterScreen';
import { ProtectedScreen } from '../Screens/ProtectedScreen';
import { LoadingScreen } from '../Screens/LoadingScreen';
import { ProductNavigator } from './ProductNavigator';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {status} = useContext(AuthContext);

  if (status === 'checking') {return <LoadingScreen/>;}
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle:{
          backgroundColor: 'white',
        },
      }}
    >
      {
        status !== 'authenticated'
        ?
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
        :
        <>
          <Stack.Screen name="ProductNavigator" component={ProductNavigator} />
          <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </>
      }
    </Stack.Navigator>
  );
};
