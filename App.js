import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';
import GlobalStockScreen from './screens/GlobalStockScreen';
import ComponentStockScreen from './screens/ComponentStockScreen';
import CommandeScreen from './screens/CommandeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hermès">
        <Stack.Screen name="Hermès" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{title: 'Scanner Composant', headerStyle: {
            backgroundColor: '#000E3D',}, headerTintColor: '#E5B80B', headerTitleStyle: {
              fontWeight: 'bold'}}}/>
        <Stack.Screen name="ComponentStockScreen" component={ComponentStockScreen} options={{title: 'Stock d\'un composant', headerStyle: {
            backgroundColor: '#000E3D',}, headerTintColor: '#E5B80B', headerTitleStyle: {
              fontWeight: 'bold'}}}/>
        <Stack.Screen name="GlobalStockScreen" component={GlobalStockScreen} options={{title: 'Stock Global', headerStyle: {
            backgroundColor: '#000E3D',}, headerTintColor: '#E5B80B', headerTitleStyle: {
              fontWeight: 'bold'}}}/>
        <Stack.Screen name="CommandeScreen" component={CommandeScreen} options={{title: 'Scan Commande', headerStyle: {
            backgroundColor: '#000E3D',}, headerTintColor: '#E5B80B', headerTitleStyle: {
              fontWeight: 'bold'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
