import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserNavigator from './app/storefront/navigation/AppNavigator';
import SellerNavigator from './app/seller/navigation/AppNavigator';
import { useAuthStore } from './app/shared/store/useAuthStore';
import AppNavigator from './app/shared/navigation/AppNavigator';
function RootNavigator() {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <AppNavigator/>;
  }

  if (user?.role === 'SELLER') {
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
