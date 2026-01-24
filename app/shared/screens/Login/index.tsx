import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  StatusBar,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from './styles';
import { useThemeStore } from '../../store/useThemeStore';
import { THEME } from '../../theme/constants';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Register: undefined;
  TabNavigator: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('TabNavigator');
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Decorative Background shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />
      <View style={[styles.bgShape3, { backgroundColor: currentTheme.shape1, opacity: 0.1 }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}>
              {/* Header section */}
              <View style={styles.header}>
                <View style={[styles.logoContainer, { backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.1)' }]}>
                  <Ionicons name="book" size={40} color={currentTheme.primary} />
                </View>
                <Text style={[styles.title, { color: currentTheme.text }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Log in to your account and explore books</Text>
              </View>

              {/* Form section */}
              <View style={[styles.form, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                {/* Email Input */}
                <View style={styles.inputWrapper}>
                  <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Email Address</Text>
                  <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border }]}>
                    <Ionicons name="mail-outline" size={20} color={currentTheme.primary} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, { color: currentTheme.text }]}
                      placeholder="Enter your email"
                      placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputWrapper}>
                  <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Password</Text>
                  <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border }]}>
                    <Ionicons name="lock-closed-outline" size={20} color={currentTheme.primary} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, { color: currentTheme.text }]}
                      placeholder="Enter your password"
                      placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={currentTheme.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: currentTheme.primary }]}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.loginButton, { backgroundColor: currentTheme.primary }]}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>{isLoading ? 'Logging In...' : 'Log In'}</Text>
                </TouchableOpacity>
              </View>

              {/* Social Login */}
              <View style={styles.dividerContainer}>
                <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />
                <Text style={[styles.dividerText, { color: currentTheme.textSecondary }]}>OR CONTINUE WITH</Text>
                <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                  <Ionicons name="logo-apple" size={24} color={currentTheme.text} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: currentTheme.textSecondary }]}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerLink, { color: currentTheme.primary }]}>Register Now</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
