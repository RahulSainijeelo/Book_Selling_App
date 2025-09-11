import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './app/shared/screens/sign-in';
import UserNavigator from './app/storefront/navigation/AppNavigator';
import SellerNavigator from './app/seller/navigation/AppNavigator';
import { useAuthStore } from './app/shared/store/useAuthStore';

function RootNavigator() {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) {
    return <SignInScreen />;
  }

  if (role === 'seller') {
    return <SellerNavigator />;
  } else {
    return <UserNavigator />;
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
