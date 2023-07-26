/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Button } from 'react-native';
import { ProductContext } from '../context/ProductsContext';
// import { Producto } from '../interfaces/ProductsInterfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParams } from '../navigator/ProductNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductsScreen'>{}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, getProducts} = useContext(ProductContext);
  const {logOut} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> (<TouchableOpacity activeOpacity={0.8} style={{marginRight: 10}} onPress={()=> navigation.navigate('ProductScreen', {})}><Text>Agregar</Text></TouchableOpacity>),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await getProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const logout = async () => {
    await logOut();
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(e) => e._id }
        renderItem={({item}) =>( <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate('ProductScreen', { id: item._id, name: item.nombre })}><Text style={styles.prodctName}>{item.nombre}</Text></TouchableOpacity>)}
        ItemSeparatorComponent={()=>(<View style={styles.separator}/>)}
        refreshControl={(<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>)}
      />
      <View style={{marginBottom: 20}}>
        <Button
          title="Cerrar sesion"
          onPress={logout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  prodctName : {
    fontSize: 20,
  },
  separator: {
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
});
