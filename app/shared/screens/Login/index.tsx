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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { jwtDecode } from 'jwt-decode';
import api from '../../../services/api.service';
import { useAuthStore } from "../../store/useAuthStore";

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

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loginUser, setIsLoading: setStoreLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setStoreLoading(true);

    try {
      console.log('Attempting to login user...');
      
      const loginData = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      console.log('Login data:', { ...loginData, password: '[HIDDEN]' });

      const response = await api.post('/api/auth/login', loginData);

      console.log('Login response:', response.data);

      if (response.status === 200 || response.status === 201) {
        const { id, name, email: userEmail, token } = response.data;

        if (!token) {
          throw new Error('Token not found in response');
        }

        try {
          // Decode JWT token to extract all information
          const decodedToken: JWTPayload = jwtDecode(token);
          
          console.log('Decoded JWT token:', decodedToken);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error('Token is expired');
          }
          
          // Extract user information from both response and decoded token
          const user = {
            id: decodedToken.id || id,
            name: name || decodedToken.name || '',
            email: userEmail || decodedToken.email || email.trim(),
            role: (decodedToken.role || 'user'),
            
            // Additional fields from token if present
            ...(decodedToken.avatar && { avatar: decodedToken.avatar }),
            ...(decodedToken.permissions && { permissions: decodedToken.permissions }),
            
            // Token timing info
            tokenIssuedAt: decodedToken.iat ? new Date(decodedToken.iat * 1000).toISOString() : null,
            tokenExpiresAt: decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : null,
          };

          console.log('Constructed user object:', user);

          // Store user and token in zustand store
          loginUser(user, token);

          // Show success message
          const expiryDate = decodedToken.exp 
            ? new Date(decodedToken.exp * 1000).toLocaleDateString() 
            : 'No expiry';

          Alert.alert(
            'Welcome Back! 👋', 
            `Successfully logged in as ${user.name}\n\nToken expires: ${expiryDate}`,
            [
              {
                text: 'Continue',
                onPress: () => {
                  // Navigate to main app
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
          const fallbackUser:any = {
            id,
            name,
            email: userEmail,
            role: 'user',
          };

          loginUser(fallbackUser, token);
          
          Alert.alert(
            'Welcome Back! 👋', 
            `Successfully logged in as ${name}`,
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
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            errorMessage = data.message || data.error || 'Invalid credentials';
            break;
          case 401:
            errorMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 403:
            errorMessage = 'Account access denied. Please contact support.';
            break;
          case 404:
            errorMessage = 'Account not found. Please check your email or sign up.';
            break;
          case 429:
            errorMessage = 'Too many login attempts. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = data.message || data.error || `Error ${status}: Login failed`;
        }
        
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred';
      }

      Alert.alert('Login Failed', errorMessage);
      
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

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>          
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.headerLink}>Get started</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brand */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>Bookie</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeTitle}>Welcome Back</Text>
          <Text style={styles.welcomeSubtitle}>Enter your details below</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !isValidEmail(email) && email.length > 0 && styles.inputError]}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
              editable={!isLoading}
            />
            {email.length > 0 && isValidEmail(email) && (
              <Ionicons name="checkmark-circle" size={20} color="#2ed573" style={styles.inputIcon} />
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor="#999"
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.eyeButton}
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

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signInButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.signInButtonText}>Signing In...</Text>
              </View>
            ) : (
              <Text style={styles.signInButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  headerLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  brandContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  signInButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 16,
  },
});
