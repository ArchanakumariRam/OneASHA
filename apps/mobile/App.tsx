import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PatientRegistrationScreen from './src/screens/PatientRegistrationScreen';
import MyPatientsScreen from './src/screens/MyPatientsScreen';
import ImmunizationScreen from './src/screens/ImmunizationScreen';
import AntenatalCareScreen from './src/screens/AntenatalCareScreen';
import PostnatalCareScreen from './src/screens/PostnatalCareScreen';
import HealthSurveyScreen from './src/screens/HealthSurveyScreen';
import InventoryScreen from './src/screens/InventoryScreen';

const Stack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: '#4F46E5' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' as const },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={headerStyle}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'OneASHA Field App' }} />
          <Stack.Screen name="RegisterPatient" component={PatientRegistrationScreen} options={{ title: 'Add Patient' }} />
          <Stack.Screen name="MyPatients" component={MyPatientsScreen} options={{ title: 'My Patients' }} />
          <Stack.Screen name="Immunization" component={ImmunizationScreen} options={{ title: 'Immunization' }} />
          <Stack.Screen name="AntenatalCare" component={AntenatalCareScreen} options={{ title: 'Antenatal Care (ANC)' }} />
          <Stack.Screen name="PostnatalCare" component={PostnatalCareScreen} options={{ title: 'Postnatal Care (PNC)' }} />
          <Stack.Screen name="HealthSurvey" component={HealthSurveyScreen} options={{ title: 'Health Survey' }} />
          <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Medicine Inventory' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
