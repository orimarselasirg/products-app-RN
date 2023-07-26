/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import { Backgorund } from '../components/Backgorund';
import { LogoLogin } from '../components/LogoLogin';
import { Text, TextInput, Platform, TouchableOpacity, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { styles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  useEffect(()=>{
    if (errorMessage.length === 0) {return;}
    Alert.alert('Login Incorrecto', errorMessage, [{text: 'Ok', onPress: removeError }]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errorMessage]);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const login = () => {
    signIn({correo: email, password});
    Keyboard.dismiss();
  };
  return (
    <>
      <Backgorund
        backgroundStyling = {false}
        backgroundColor="blue"
        height={1200}
        width={1000}
        top={-350}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.loginContainer}>
          <LogoLogin
            imageWidth={110}
            imageHeight={100}
          />
          <Text style={styles.title}>Login</Text>
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
            onSubmitEditing={login}
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
            onSubmitEditing={login}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={()=> login()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=> navigation.replace('RegisterScreen')}
              // style={styles.button}
            >
              <Text style={styles.buttonText}>Nueva Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
