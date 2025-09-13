import React, { useState } from 'react';
import { ScrollView, View,Text, StyleSheet, Switch, TouchableOpacity, Button, Image } from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import Profile from '../../components/Profile';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../../navigation/AppNavigator';
type SettingsNavigationProp = NativeStackNavigationProp<TabParamList>;

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const navigation = useNavigation<SettingsNavigationProp>();
  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    hasSwitch = false, 
    switchValue, 
    onSwitchChange,
    onPress 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon} size={24} color="#6200ea" />
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#767577', true: '#6200ea' }}
          thumbColor={switchValue ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Profile/>
      <Text style={styles.sectionHeader}>Account</Text>
        <SettingsItem
        icon="person-circle"
        title="Your Orders"
        subtitle="Check Your Orders"
        onPress={() => {navigation.navigate("Your Orders")}}
      />
      <SettingsItem
        icon="person-circle"
        title="Favorites"
        subtitle="Check Your Orders"
        onPress={() => {navigation.navigate("Favorites")}}
      />
      <SettingsItem
        icon="person-circle"
        title="Account Settings"
        subtitle="Manage your account"
        onPress={() => console.log('Account Settings pressed')}
      />
      <SettingsItem
        icon="help-circle"
        title="Help & Support"
        subtitle="Get help and contact us"
        onPress={() => console.log('Help pressed')}
      />
       <Text style={styles.sectionHeader}>Preferences</Text>      
      <SettingsItem
        icon="moon"
        title="Dark Mode"
        subtitle="Use dark theme"
        hasSwitch
        switchValue={darkModeEnabled}
        onSwitchChange={setDarkModeEnabled}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  settingsItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});