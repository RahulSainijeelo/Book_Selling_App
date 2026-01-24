import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, Alert, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import Profile from '../../components/Profile';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import { useAuthStore } from '../../../shared/store/useAuthStore'; // Import the auth store
import { useThemeStore } from '../../../shared/store/useThemeStore';
import { THEME } from '../../../shared/theme/constants';

type TabParamList = {
  Login: any
  Register: any
  "Your Orders": any,
  "Favorites": any
}
type SettingsNavigationProp = NativeStackNavigationProp<TabParamList>;

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const navigation = useNavigation<SettingsNavigationProp>();
  const { logout, user } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  const SettingsItem = ({
    icon,
    title,
    subtitle,
    hasSwitch = false,
    switchValue,
    onSwitchChange,
    onPress,
    isDestructive = false
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    isDestructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.settingsItem,
        {
          backgroundColor: currentTheme.card,
          borderColor: currentTheme.border
        },
        isDestructive && styles.logoutButton
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDestructive ? 'rgba(239, 68, 68, 0.1)' : currentTheme.iconBg }]}>
          <Ionicons
            name={icon}
            size={22}
            color={isDestructive ? "#EF4444" : currentTheme.primary}
          />
        </View>
        <View style={styles.settingsItemText}>
          <Text style={[
            styles.settingsItemTitle,
            { color: currentTheme.text },
            isDestructive && styles.destructiveText
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[
              styles.settingsItemSubtitle,
              { color: currentTheme.textSecondary },
              isDestructive && styles.destructiveSubtitle
            ]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', true: currentTheme.primary }}
          thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={18} color={currentTheme.textSecondary} />
      )}
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            });
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? THEME.dark.background[0] : THEME.light.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Background shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Settings</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.contentContainer, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Profile />

        <Text style={[styles.sectionHeader, { color: currentTheme.textSecondary }]}>Account</Text>
        <SettingsItem
          icon="cube-outline"
          title="Your Orders"
          subtitle="View and track your reading orders"
          onPress={() => { navigation.navigate("Your Orders"); }}
        />
        <SettingsItem
          icon="heart-outline"
          title="Favorites"
          subtitle="Access your saved books collection"
          onPress={() => { navigation.navigate("Favorites"); }}
        />
        <SettingsItem
          icon="person-outline"
          title="Account Settings"
          subtitle="Update your profile and personal info"
          onPress={() => console.log('Account Settings')}
        />

        <Text style={[styles.sectionHeader, { color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }]}>Preferences</Text>
        <SettingsItem
          icon="moon-outline"
          title="Dark Mode"
          subtitle="Reduce glare and rest your eyes"
          hasSwitch
          switchValue={isDarkMode}
          onSwitchChange={toggleTheme}
        />
        <SettingsItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="Stay updated with new releases"
          hasSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />

        <Text style={[styles.sectionHeader, { color: isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }]}>Support</Text>
        <SettingsItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get assistance with your account"
          onPress={() => console.log('Support')}
        />
        <SettingsItem
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out of your account"
          onPress={handleLogout}
          isDestructive={true}
        />

        {/* Spacing for tab bar */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}