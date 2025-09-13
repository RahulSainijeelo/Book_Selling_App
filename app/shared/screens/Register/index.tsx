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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RegisterScreenNavigationProp = NativeStackNavigationProp<any>;

export default function SignupScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
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
    
    // Simulate signup API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app or show success
      Alert.alert('Success', 'Account created successfully!');
    }, 2000);
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
              style={styles.input}
              placeholder="nicholas@engema.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#999"
            />
          </View>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nicholas Engema"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
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
              <View style={[styles.strengthBar, password.length >= 2 && styles.weakStrength]} />
              <View style={[styles.strengthBar, password.length >= 6 && styles.mediumStrength]} />
              <View style={[styles.strengthBar, password.length >= 8 && styles.strongStrength]} />
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
            <Text style={styles.signUpButtonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
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
  backButton: {
    padding: 8,
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
