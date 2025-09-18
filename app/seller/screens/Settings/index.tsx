import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import {Ionicons} from '@react-native-vector-icons/ionicons';
import Profile from '../../components/Profile';
import styles from "./styles"
export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

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
      <View>
        <Profile/>
      </View>
      <Text style={styles.sectionHeader}>Preferences</Text>
      
      <SettingsItem
        icon="notifications"
        title="Push Notifications"
        subtitle="Receive app notifications"
        hasSwitch
        switchValue={notificationsEnabled}
        onSwitchChange={setNotificationsEnabled}
      />
      
      <SettingsItem
        icon="moon"
        title="Dark Mode"
        subtitle="Use dark theme"
        hasSwitch
        switchValue={darkModeEnabled}
        onSwitchChange={setDarkModeEnabled}
      />
      
      <SettingsItem
        icon="location"
        title="Location Services"
        subtitle="Allow location access"
        hasSwitch
        switchValue={locationEnabled}
        onSwitchChange={setLocationEnabled}
      />

      <Text style={styles.sectionHeader}>Account</Text>
      
      <SettingsItem
        icon="person-circle"
        title="Account Settings"
        subtitle="Manage your account"
        onPress={() => console.log('Account Settings pressed')}
      />
      
      <SettingsItem
        icon="lock-closed"
        title="Privacy & Security"
        subtitle="Control your privacy"
        onPress={() => console.log('Privacy Settings pressed')}
      />
      
      <SettingsItem
        icon="help-circle"
        title="Help & Support"
        subtitle="Get help and contact us"
        onPress={() => console.log('Help pressed')}
      />
    </ScrollView>
  );
}