import React, { useState, useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isValidEmail, getPasswordStrength, validateForm } from '../../validations/auth.validations';
import { useAuthStore } from "../../store/useAuthStore";
import { handleSignupSubmission } from '../../lib/authFormHandler';
import styles from './styles';

type RegisterScreenNavigationProp = NativeStackNavigationProp<any>;
type UserRole = 'USER' | 'SELLER';

const { height: screenHeight } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { loginUser, setIsLoading: setStoreLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates.height);
        Animated.spring(translateY, {
          toValue: -50,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);

        // Animate form back to original position
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener?.remove();
      keyboardDidShowListener?.remove();
    };
  }, [translateY]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!email.trim()) {
        return;
      }
      if (!isValidEmail(email)) {
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSignup = () => {
    handleSignupSubmission({
      email,
      fullName,
      password,
      role,
      setIsLoading,
      setStoreLoading,
      loginUser,
      navigation,
    });
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            {currentStep === 2 && (
              <TouchableOpacity onPress={handlePreviousStep} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>
            )}

            <View style={styles.headerRight}>
              <Text style={styles.headerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.headerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={[
              styles.contentContainer,
              {
                transform: [{ translateY }],
              }
            ]}
          >
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={[
                styles.scrollViewContent,
                keyboardVisible && { paddingBottom: keyboardHeight + 20 }
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >

              <View style={styles.formContainer}>
                <View style={styles.brandContainer}>
                  <Text style={styles.brandName}>Bookie</Text>
                </View>
                <View style={styles.formActual}>
                  {currentStep === 1 ? (
                  <>
                    <Text style={styles.welcomeTitle}>Let's get started.</Text>

                    <View style={styles.roleSection}>
                      <Text style={styles.sectionLabel}>I want to join as</Text>
                      <View style={styles.roleOptions}>
                        <TouchableOpacity
                          style={[
                            styles.roleCard,
                            role === 'USER' && styles.roleCardSelected
                          ]}
                          onPress={() => setRole('USER')}
                          disabled={isLoading}
                        >
                          <Ionicons
                            name="person-outline"
                            size={24}
                            color={role === 'USER' ? '#8B5CF6' : '#666'}
                          />
                          <Text style={[
                            styles.roleText,
                            role === 'USER' && styles.roleTextSelected
                          ]}>
                            User
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.roleCard,
                            role === 'SELLER' && styles.roleCardSelected
                          ]}
                          onPress={() => setRole('SELLER')}
                          disabled={isLoading}
                        >
                          <Ionicons
                            name="storefront-outline"
                            size={24}
                            color={role === 'SELLER' ? '#8B5CF6' : '#666'}
                          />
                          <Text style={[
                            styles.roleText,
                            role === 'SELLER' && styles.roleTextSelected
                          ]}>
                            Seller
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Email Address</Text>
                      <View style={[
                        styles.inputWrapper,
                        email.length > 0 && !isValidEmail(email) && styles.inputError
                      ]}>
                        <TextInput
                          style={styles.input}
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
                      {email.length > 0 && !isValidEmail(email) && (
                        <Text style={styles.errorText}>Please enter a valid email address</Text>
                      )}
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        (!email.trim() || !isValidEmail(email)) && styles.disabledButton
                      ]}
                      onPress={handleNextStep}
                      disabled={!email.trim() || !isValidEmail(email) || isLoading}
                    >
                      <Text style={styles.continueButtonText}>Continue</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Full Name</Text>
                      <View style={styles.inputWrapper}>
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
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Password</Text>
                      <View style={styles.inputWrapper}>
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
                    </View>
                    {password.length > 0 && (
                      <View style={styles.passwordStrengthContainer}>
                        <View style={styles.passwordStrengthBars}>
                          <View style={[
                            styles.strengthBar,
                            passwordStrength >= 1 && styles.weakStrength
                          ]} />
                          <View style={[
                            styles.strengthBar,
                            passwordStrength >= 2 && styles.mediumStrength
                          ]} />
                          <View style={[
                            styles.strengthBar,
                            passwordStrength >= 3 && styles.strongStrength
                          ]} />
                        </View>
                        <Text style={styles.passwordStrengthText}>
                          {passwordStrength < 2 ? 'Weak' : passwordStrength < 3 ? 'Medium' : 'Strong'}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={[styles.signUpButton, isLoading && styles.disabledButton]}
                      onPress={handleSignup}
                      disabled={isLoading || password.length < 6}
                    >
                      {isLoading ? (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#fff" />
                          <Text style={styles.signUpButtonText}>Creating Account...</Text>
                        </View>
                      ) : (
                        <Text style={styles.signUpButtonText}>Create Account</Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}
                <View style={styles.bottomPadding} />
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}