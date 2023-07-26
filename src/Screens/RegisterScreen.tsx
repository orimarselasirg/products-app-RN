/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { styles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { LogoLogin } from '../components/LogoLogin';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError, status} = useContext(AuthContext);

  useEffect(()=>{
    if (status === 'authenticated') {
      Alert.alert('Registro exitoso', '', [{text: 'Ok', onPress: removeError }]);
    }
    if (errorMessage.length === 0) {return;}
    Alert.alert('Registro Incorrecto', errorMessage, [{text: 'Ok', onPress: removeError }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errorMessage, status]);

  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const register = () => {
    console.log({email, password, name});
    signUp({correo : email, password, nombre: name});
    Keyboard.dismiss();
  };
    return (
      <>

        <KeyboardAvoidingView
          style={{flex: 1, backgroundColor: '#5856d6'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.loginContainer}>
            <LogoLogin
              imageWidth={110}
              imageHeight={100}
            />
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              placeholder="Ingrese Nombre"
              placeholderTextColor="rgba(255,255,255, 0.4)"
              underlineColorAndroid="white"
              style={[styles.input, Platform.OS === 'ios' && styles.inputFieldIos ]}
              selectionColor="rgba(255,255,255,0.4)"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value)=>onChange(value, 'name')}
              value={name}
              onSubmitEditing={register}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              placeholder="Ingrese Email"
              placeholderTextColor="rgba(255,255,255, 0.4)"
              keyboardType="email-address"
              underlineColorAndroid="white"
              style={[styles.input, Platform.OS === 'ios' && styles.inputFieldIos ]}
              selectionColor="rgba(255,255,255,0.4)"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value)=>onChange(value, 'email')}
              value={email}
              onSubmitEditing={register}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              placeholder="*********"
              placeholderTextColor="rgba(255,255,255, 0.4)"
              underlineColorAndroid="white"
              secureTextEntry
              style={[styles.input, Platform.OS === 'ios' && styles.inputFieldIos ]}
              selectionColor="rgba(255,255,255,0.4)"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value)=>onChange(value, 'password')}
              value={password}
              onSubmitEditing={register}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={()=> register()}
              >
                <Text style={styles.buttonText}>Crea cuenta</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.newUserContainer}> */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=> navigation.replace('LoginScreen')}
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 20,
                  borderWidth: 1,
                  borderColor: 'white',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 100,
                }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            {/* </View> */}
          </View>
        </KeyboardAvoidingView>
      </>
    );
};
