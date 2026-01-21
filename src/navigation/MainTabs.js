import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomFabBar } from 'rn-wave-bottom-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import ServicesScreen from '../features/services/ServicesScreen';
import CartScreen from '../features/cart/CartScreen';
import ProfileScreen from '../features/profile/ProfileScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabBarIcon = (name) => ({ focused }) => (
  <Icon
    name={name}
    size={26}
    color={focused ? '#FFFFFF' : '#94A3B8'}
  />
);

export default function MainTabs() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: colors.primary,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => {
        if (isKeyboardVisible) return null;

        return (
          <BottomFabBar
            mode="default"
            focusedButtonStyle={styles.fabShadow}
            bottomBarContainerStyle={styles.bottomBarContainer}
            {...props}
          />
        );
      }}
    >
      <Tab.Screen
        name="Home"
        component={ServicesScreen}
        options={{
          tabBarIcon: tabBarIcon('home'),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: tabBarIcon('shoppingcart'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: tabBarIcon('user'),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 0,
  },
  fabShadow: {
    backgroundColor: colors.primary, 
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 9.11,
    elevation: 14,
  },
});