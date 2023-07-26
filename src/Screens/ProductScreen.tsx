/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native';
import { ProductStackParams } from '../navigator/ProductNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import { useCategory } from '../hooks/useCategory';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { ProductContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'>{}

export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name} = route.params;
  const [photoTemp, setPhotoTemp] = useState<string>();
  const {getProductsById, createProduct, updateProduct, deleteProduct, uploadImage} = useContext(ProductContext);
  const {cateogories, isLoading} = useCategory();
  const {_id, category, img, nameProduct = '', onChange, setFormValue} = useForm({
    _id: id,
    nameProduct: name,
    category: '',
    img: '',
  });

  useEffect(()=> {
    navigation.setOptions({
      title: nameProduct ? nameProduct : 'Nuevo Producto',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[nameProduct]);

  useEffect(() => {
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const loadProduct = async() => {
    if (id.length === 0) {return;}
    const product = await getProductsById(id);
    setFormValue({
      _id: id,
      category: product.categoria._id,
      img: product.img || '',
      nameProduct: name,
    });
  };

  const deleteProd = async() => {
    // try {
      await deleteProduct(_id);
      navigation.navigate('ProductsScreen');
      // return deleteData;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const saveOrUpdateProduct = async() => {
    if (id.length > 0) {
      //Actualizar
      console.log('actualizar');
      await updateProduct(category, nameProduct, id);

    } else {
      //crear
      console.log('crear');
      const tempCategoryId = category || cateogories[0]._id;
      const newProduct = await createProduct(tempCategoryId, nameProduct );
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    try {
      launchCamera({
        // cameraType: 'front',
        mediaType: 'photo',
        quality: 0.5,
      }, (res) => {
        if (res.didCancel) {return;}
        const uriFound = res.assets![0].uri;
        console.log({uriFound});
        if (!uriFound) {return;}
        setPhotoTemp(uriFound);
        // uploadImage(_id, res);
        uploadImage(res, _id);

        // console.log(JSON.stringify(res, null, 2));
        // console.log(res.assets![0].uri);
      });

    } catch (error) {
      console.log(error);
    }
  };


  const photoFromGalery = () => {
    try {
      launchImageLibrary({
        // cameraType: 'front',
        mediaType: 'photo',
        quality: 0.5,
      }, (res) => {
        if (res.didCancel) {return;}
        const uriFound = res.assets![0].uri;
        console.log({uriFound});
        if (!uriFound) {return;}
        setPhotoTemp(uriFound);
        // uploadImage(_id, res);
        uploadImage(res, _id);

        // console.log(JSON.stringify(res, null, 2));
        // console.log(res.assets![0].uri);
      });

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
     {isLoading && <LoadingScreen/>}
     <ScrollView
      // pullToRefresh={() =>{}}
     >
      <Text style={styles.label}> Nombre del producto:</Text>
      <TextInput
        style={styles.input}
        placeholder="producto"
        value={nameProduct}
        onChangeText={(value) => onChange(value, 'nameProduct')}
      />
      <Text style={styles.label}> Categoria:</Text>

      <Picker
        selectedValue={category}
        // mode="dropdown"
        // defaultValue={product?.categoria.nombre}
        onValueChange={(value:string) => onChange(value, 'category')}
        >
        {cateogories.map((c) => (
          <Picker.Item label={c.nombre} value={c._id} key={c._id} />
        ))}
      </Picker>

      <Button
        title="Guardar"
        color="#5856d6"
        onPress={saveOrUpdateProduct}
      />
      {
        _id.length > 0 && (
          <View>
            <View style={styles.buttongroups}>
              <Button
                title="Camara"
                color="#5856d6"
                onPress={takePhoto}
              />
              <View style={{width: 20}}/>
              <Button
                title="Galeria"
                color="#5856d6"
                onPress={photoFromGalery}
              />
            </View>
            <Button
              title="Eliminar"
              color="red"
              onPress={deleteProd}
            />
          </View>
        )
      }
      {
        img.length > 0 && !photoTemp &&
        <Image
          source={{uri: img}}
          style={{width:'100%', height: 300, marginTop: 20}}
        />

      }
       {
        photoTemp &&
        <Image
          source={{uri: photoTemp}}
          style={{width:'100%', height: 300, marginTop: 20}}
        />

      }
     </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    height: 40,
  },
  buttongroups: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
