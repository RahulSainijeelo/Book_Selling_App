import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LibraryScreen from '../screens/LibraryScreen';
import { useThemeStore } from '../../shared/store/useThemeStore';
import { THEME } from '../../shared/theme/constants';

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Cart: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          if (focused) {
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Library') iconName = 'library';
            else if (route.name === 'Cart') iconName = 'cart';
            else if (route.name === 'Settings') iconName = 'person';
          } else {
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Library') iconName = 'library-outline';
            else if (route.name === 'Cart') iconName = 'cart-outline';
            else if (route.name === 'Settings') iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: isDarkMode ? 'rgba(255, 255, 255, 0.62)' : 'rgba(0,0,0,0.4)',
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: 20,
          right: 20,
          height: 50,
          width: "85%",
          marginLeft: "7%",
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          height: 60,
          marginHorizontal: 5,
          borderRadius: 20,
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              style={[
                props.style,
                styles.tabButton,
                { backgroundColor: props.accessibilityState?.selected ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)') : currentTheme.card },
                { borderColor: props.accessibilityState?.selected ? currentTheme.primary : currentTheme.border }
              ]}
            />
          )
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              style={[
                props.style,
                styles.tabButton,
                { backgroundColor: props.accessibilityState?.selected ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)') : currentTheme.card },
                { borderColor: props.accessibilityState?.selected ? currentTheme.primary : currentTheme.border }
              ]}
            />
          )
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              style={[
                props.style,
                styles.tabButton,
                { backgroundColor: props.accessibilityState?.selected ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)') : currentTheme.card },
                { borderColor: props.accessibilityState?.selected ? currentTheme.primary : currentTheme.border }
              ]}
            />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: (props: any) => (
            <TouchableOpacity
              {...props}
              style={[
                props.style,
                styles.tabButton,
                { backgroundColor: props.accessibilityState?.selected ? (isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)') : currentTheme.card },
                { borderColor: props.accessibilityState?.selected ? currentTheme.primary : currentTheme.border }
              ]}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    height: 56,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
