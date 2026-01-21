import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../core/AuthContext';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import SplashScreen from '../components/SplashScreen';
import PartnerServicesScreen from '../features/services/PartnerServicesScreen';
import CategoryServicesScreen from '../features/services/CategoryServicesScreen';
import PaymentScreen from '../features/cart/PaymentScreen';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);
  const [splashDone, setSplashDone] = useState(false);

  if (loading || !splashDone) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {() => <SplashScreen onFinish={() => setSplashDone(true)} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="PartnerServices"
            component={PartnerServicesScreen}
            options={{ title: 'Services' }}
          />
          <Stack.Screen
            name="CategoryServices"
            component={CategoryServicesScreen}
            options={{ title: 'Category' }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: 'Category' }}
          />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
