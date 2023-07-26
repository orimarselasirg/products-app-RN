import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

  const {logOut, user, token} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pantalla protegida
      </Text>
      <Button
        title="logout"
        color="darkorange"
        onPress={()=> logOut()}
      />
      <Text>
        User: {JSON.stringify(user, null, 2)}
        Token: {JSON.stringify(token, null, 2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
