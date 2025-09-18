import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { jwtDecode } from 'jwt-decode';
import api from '../../../services/api.service';
import { useAuthStore } from "../../store/useAuthStore";
import loginStyles from './styles';

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<any>;
type UserRole = 'USER' | 'SELLER';

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loginUser, setIsLoading: setStoreLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (emailValue: string) => {
    if (!emailValue.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!isValidEmail(emailValue)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      validateEmail(text);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      validatePassword(text);
    }
  };

  const handleLogin = async () => {
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Validation
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);
    setStoreLoading(true);

    try {
      console.log('Attempting to login user...');
      
      const loginData = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        role: role, // Include role in login request
      };

      console.log('Login data:', { ...loginData, password: '[HIDDEN]' });

      const response = await api.post('/api/auth/login', loginData);
      console.log('Login response:', response.data);

      if (response.status === 200 || response.status === 201) {
        const { id, name, email: userEmail, role: userRole, token } = response.data;

        if (!token) {
          throw new Error('Token not found in response');
        }

        try {
          const decodedToken: JWTPayload = jwtDecode(token);
          
          console.log('Decoded JWT token:', decodedToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error('Token is expired');
          }

          const user = {
            id: decodedToken.id || id,
            name: name || decodedToken.name || '',
            email: userEmail || decodedToken.email || email.trim(),
            role: userRole || decodedToken.role || role,
            
            ...(decodedToken.avatar && { avatar: decodedToken.avatar }),
            ...(decodedToken.permissions && { permissions: decodedToken.permissions }),
   
            tokenIssuedAt: decodedToken.iat ? new Date(decodedToken.iat * 1000).toISOString() : null,
            tokenExpiresAt: decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : null,
          };

          console.log('Constructed user object:', user);
          loginUser(user, token);

          const roleText = role === 'SELLER' ? 'seller' : 'reader';
          const expiryDate = decodedToken.exp 
            ? new Date(decodedToken.exp * 1000).toLocaleDateString() 
            : 'No expiry';

          Alert.alert(
            'Welcome Back! 👋', 
            `Successfully logged in as ${user.name} (${roleText})\n\nToken expires: ${expiryDate}`,
            [
              {
                text: 'Continue',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                  });
                }
              }
            ]
          );

        } catch (decodeError) {
          console.error('JWT decode error:', decodeError);
          const fallbackUser: any = {
            id,
            name,
            email: userEmail,
            role: userRole || role,
          };

          loginUser(fallbackUser, token);
          
          const roleText = role === 'SELLER' ? 'seller' : 'reader';
          Alert.alert(
            'Welcome Back! 👋', 
            `Successfully logged in as ${name} (${roleText})`,
            [
              {
                text: 'Continue',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                  });
                }
              }
            ]
          );
        }
      } else {
        throw new Error('Unexpected response status');
      }

    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            setEmailError(data.message || data.error || 'Invalid credentials');
            break;
          case 401:
            setPasswordError('Invalid password. Please check your credentials.');
            break;
          case 403:
            setEmailError('Account access denied. Please contact support.');
            break;
          case 404:
            setEmailError('Account not found. Please check your email or sign up.');
            break;
          case 429:
            setEmailError('Too many login attempts. Please try again later.');
            break;
          case 500:
            Alert.alert('Server Error', 'Server error. Please try again later.');
            break;
          default:
            setEmailError(data.message || data.error || 'Login failed');
        }
        
      } else if (error.request) {
        Alert.alert('Network Error', 'Network error. Please check your connection and try again.');
      } else {
        Alert.alert('Error', error.message || 'An unexpected error occurred');
      }
      
    } finally {
      setIsLoading(false);
      setStoreLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be implemented soon.',
      [
        { text: 'OK' }
      ]
    );
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setShowRoleDropdown(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={loginStyles.keyboardAvoidingView}
    >
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        setShowRoleDropdown(false);
      }} accessible={false}>
        <View style={loginStyles.loginContainer}>
          {/* Header */}
          <View style={loginStyles.loginHeader}>          
            <View style={loginStyles.loginHeaderRight}>
              <Text style={loginStyles.loginHeaderText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={loginStyles.loginHeaderLink}>Get started</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView 
            contentContainerStyle={loginStyles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View style={loginStyles.loginFormContainer}>
              <View style={loginStyles.loginBrandContainer}>
                <Text style={loginStyles.loginBrandName}>Bookie</Text>
              </View>

              <Text style={loginStyles.loginWelcomeTitle}>Welcome Back</Text>
              <Text style={loginStyles.loginWelcomeSubtitle}>Enter your details below</Text>

              {/* Role Selection */}
              <View style={loginStyles.roleSelectionContainer}>
                <Text style={loginStyles.roleLabel}>Login as</Text>
                <TouchableOpacity
                  style={loginStyles.roleSelector}
                  onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                  disabled={isLoading}
                >
                  <View style={loginStyles.roleSelectorContent}>
                    <Ionicons 
                      name={role === 'USER' ? 'person-outline' : 'storefront-outline'} 
                      size={20} 
                      color="#8B5CF6" 
                    />
                    <Text style={loginStyles.roleSelectorText}>
                      {role === 'USER' ? 'Reader' : 'Seller'}
                    </Text>
                  </View>
                  <Ionicons 
                    name={showRoleDropdown ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>

                {showRoleDropdown && (
                  <View style={loginStyles.roleDropdown}>
                    <TouchableOpacity
                      style={[
                        loginStyles.roleOption,
                        role === 'USER' && loginStyles.roleOptionSelected
                      ]}
                      onPress={() => handleRoleSelect('USER')}
                    >
                      <Ionicons name="person-outline" size={20} color="#8B5CF6" />
                      <Text style={loginStyles.roleOptionText}>Reader</Text>
                      {role === 'USER' && (
                        <Ionicons name="checkmark" size={16} color="#8B5CF6" />
                      )}
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        loginStyles.roleOption,
                        role === 'SELLER' && loginStyles.roleOptionSelected
                      ]}
                      onPress={() => handleRoleSelect('SELLER')}
                    >
                      <Ionicons name="storefront-outline" size={20} color="#8B5CF6" />
                      <Text style={loginStyles.roleOptionText}>Seller</Text>
                      {role === 'SELLER' && (
                        <Ionicons name="checkmark" size={16} color="#8B5CF6" />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Email Input */}
              <View style={loginStyles.loginInputContainer}>
                <TextInput
                  style={[
                    loginStyles.loginInput, 
                    emailError && loginStyles.loginInputError
                  ]}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#999"
                  editable={!isLoading}
                />
                {email.length > 0 && isValidEmail(email) && !emailError && (
                  <Ionicons name="checkmark-circle" size={20} color="#2ed573" style={loginStyles.loginInputIcon} />
                )}
                {emailError && (
                  <Text style={loginStyles.errorText}>{emailError}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={loginStyles.loginInputContainer}>
                <View style={loginStyles.passwordContainer}>
                  <TextInput
                    style={[
                      loginStyles.loginInput, 
                      loginStyles.passwordInput,
                      passwordError && loginStyles.loginInputError
                    ]}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={loginStyles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError && (
                  <Text style={loginStyles.errorText}>{passwordError}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[loginStyles.signInButton, isLoading && loginStyles.disabledButton]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View style={loginStyles.loadingContainer}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={loginStyles.signInButtonText}>Signing In...</Text>
                  </View>
                ) : (
                  <Text style={loginStyles.signInButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={loginStyles.forgotPasswordButton}
                onPress={handleForgotPassword}
                disabled={isLoading}
              >
                <Text style={loginStyles.forgotPasswordText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
