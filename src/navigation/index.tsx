import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import EditVehicleScreen from '../screens/EditVehicleScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Edit: { id: number };
  Detail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Meus Veículos',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Add" 
          component={AddVehicleScreen}
          options={{
            title: 'Adicionar Veículo',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="Edit" 
          component={EditVehicleScreen}
          options={{
            title: 'Editar Veículo',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{
            title: 'Detalhes do Veículo',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}