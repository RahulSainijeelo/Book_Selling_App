// import React, { useState } from 'react';
// import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useAuthStore } from '../../store/useAuthStore';

// export default function SignInScreen() {
//   const setRole = useAuthStore((state) => state.setRole);
//   const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
//   const [selectedRole, setSelectedRole] = useState<'user' | 'seller' | null>(null);

//   const handleLogin = () => {
//     if (selectedRole) {
//       setRole(selectedRole);
//       setIsLoggedIn(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* UI same as before */}
//       <Text style={styles.title}>Book Store Sign In</Text>
//       <Text style={styles.subtitle}>Select your role</Text>
//       <View style={styles.roleButtons}>
//         <TouchableOpacity
//           style={[styles.roleButton, selectedRole === 'user' && styles.selected]}
//           onPress={() => setSelectedRole('user')}
//         >
//           <Text style={styles.roleText}>User</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.roleButton, selectedRole === 'seller' && styles.selected]}
//           onPress={() => setSelectedRole('seller')}
//         >
//           <Text style={styles.roleText}>Seller</Text>
//         </TouchableOpacity>
//       </View>
//       <Button disabled={!selectedRole} title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
//   title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
//   subtitle: { fontSize: 18, marginBottom: 16 },
//   roleButtons: { flexDirection: 'row', marginBottom: 24 },
//   roleButton: {
//     borderWidth: 1,
//     borderColor: '#6200ea',
//     padding: 16,
//     borderRadius: 8,
//     marginHorizontal: 12,
//   },
//   selected: {
//     backgroundColor: '#6200ea',
//   },
//   roleText: {
//     color: '#6200ea',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });




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
import api from '../../../services/api.service';
import { useAuthStore } from "../../store/useAuthStore";
import { jwtDecode } from 'jwt-decode';

type RegisterScreenNavigationProp = NativeStackNavigationProp<any>;

export default function SignupScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { loginUser, setIsLoading: setStoreLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const handleSignup = async () => {
    // Validation
    if (!email.trim() || !fullName.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setStoreLoading(true);

    try {
      console.log('Attempting to register user...');
      
      const registrationData = {
        email: email.trim().toLowerCase(),
        name: fullName.trim(),
        password: password.trim(),
      };

      console.log('Registration data:', { ...registrationData, password: '[HIDDEN]' });

      const response = await api.post('/api/auth/register', registrationData);

      console.log('Registration response:', response.data);

      if (response.status === 200 || response.status === 201) {
        const { id, name, email: userEmail, token } = response.data;

        if (!token) {
          throw new Error('Token not found in response');
        }

        try {
          // Decode JWT token to extract all information
          const decodedToken: any = jwtDecode(token);
          
          console.log('Decoded JWT token:', decodedToken);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            throw new Error('Token is expired');
          }
          
          // Extract user information from both response and decoded token
          const user = {
            id: decodedToken.id || id,
            name: name || decodedToken.name || fullName.trim(),
            email: userEmail || decodedToken.email || email.trim(),
            role: (decodedToken.role || 'user'),
            
            // Additional fields from token if present
            ...(decodedToken.avatar && { avatar: decodedToken.avatar }),
            ...(decodedToken.permissions && { permissions: decodedToken.permissions }),
            
            // Token timing info (useful for debugging)
            tokenIssuedAt: decodedToken.iat ? new Date(decodedToken.iat * 1000).toISOString() : null,
            tokenExpiresAt: decodedToken.exp ? new Date(decodedToken.exp * 1000).toISOString() : null,
          };

          console.log('Constructed user object:', user);

          // Store user and token in zustand store
          loginUser(user, token);

          // Show success message with token expiry info
          const expiryDate = decodedToken.exp 
            ? new Date(decodedToken.exp * 1000).toLocaleDateString() 
            : 'No expiry';

          Alert.alert(
            'Success! 🎉', 
            `Welcome ${user.name}!\nAccount created and logged in successfully.\n\nToken expires: ${expiryDate}`,
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
            role: 'user'
          };

          loginUser(fallbackUser, token);
          
          Alert.alert(
            'Success! 🎉', 
            `Welcome ${name}!\nAccount created successfully.`,
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
      console.error('Signup error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            errorMessage = data.message || data.error || 'Invalid input data';
            break;
          case 409:
            errorMessage = 'An account with this email already exists';
            break;
          case 422:
            errorMessage = data.message || data.error || 'Invalid data provided';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = data.message || data.error || `Error ${status}: Registration failed`;
        }
        
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred';
      }

      Alert.alert('Registration Failed', errorMessage);
      
    } finally {
      setIsLoading(false);
      setStoreLoading(false);
    }
  };


  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>          
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.headerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>Bookie</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeTitle}>Get started free.</Text>
          
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

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              placeholderTextColor="#999"
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Create a password"
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

          {/* Password Strength Indicator */}
          <View style={styles.passwordStrengthContainer}>
            <View style={styles.passwordStrengthBars}>
              <View style={[
                styles.strengthBar, 
                password.length >= 2 && styles.weakStrength
              ]} />
              <View style={[
                styles.strengthBar, 
                password.length >= 6 && styles.mediumStrength
              ]} />
              <View style={[
                styles.strengthBar, 
                password.length >= 8 && styles.strongStrength
              ]} />
            </View>
            <Text style={styles.passwordStrengthText}>
              {password.length < 6 ? 'Weak' : password.length < 8 ? 'Medium' : 'Strong'}
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signUpButton, isLoading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.signUpButtonText}>Creating Account...</Text>
              </View>
            ) : (
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
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
  passwordStrengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordStrengthBars: {
    flexDirection: 'row',
    marginRight: 12,
  },
  strengthBar: {
    width: 40,
    height: 4,
    backgroundColor: '#e9ecef',
    marginRight: 4,
    borderRadius: 2,
  },
  weakStrength: {
    backgroundColor: '#ff4757',
  },
  mediumStrength: {
    backgroundColor: '#ffa502',
  },
  strongStrength: {
    backgroundColor: '#2ed573',
  },
  passwordStrengthText: {
    fontSize: 12,
    color: '#666',
  },
  signUpButton: {
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
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
  termsLink: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
});
