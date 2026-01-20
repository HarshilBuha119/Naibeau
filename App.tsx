import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/core/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/core/queryClient';
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
