import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Map from './pages/Map';
import Notes from './pages/Notes';

const Drawer = createDrawerNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  async function logIn() {
    setLoggedIn(true);
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="username" />
        <TextInput secureTextEntry style={styles.input} placeholder="password" />
        <Button title='Login' onPress={logIn} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Mapa"
          options={{ drawerLabel: 'Mapa' }}
          component={Map}
        />
        <Drawer.Screen
          name="Anotações"
          options={{ drawerLabel: 'Anotações' }}
          component={Notes}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    color: '#FFF',
    paddingHorizontal: 30,
    backgroundColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default App;
