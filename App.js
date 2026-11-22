import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './MyStack.js';
import { AppDataProvider } from './store/AppDataContext.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
    <AppDataProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AppDataProvider>
    </SafeAreaProvider>
  );
}
