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
import { isValidEmail, getPasswordStrength } from '../../validations/auth.validations';
import styles from './styles';
import { useThemeStore } from '../../store/useThemeStore';
import { THEME } from '../../theme/constants';

type RegisterScreenNavigationProp = NativeStackNavigationProp<any>;
type UserRole = 'USER' | 'SELLER';

const { height: screenHeight } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const { isDarkMode } = useThemeStore();
  const currentTheme = isDarkMode ? THEME.dark : THEME.light;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
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
      if (!email.trim() || !isValidEmail(email)) return;
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('TabNavigator');
    }, 1500);
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <View style={[styles.keyboardAvoidingView, { backgroundColor: isDarkMode ? currentTheme.background[1] : currentTheme.background[0] }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Decorative Background Shapes */}
      <View style={[styles.bgShape1, { backgroundColor: currentTheme.shape2 }]} />
      <View style={[styles.bgShape2, { backgroundColor: currentTheme.shape1 }]} />
      <View style={[styles.bgShape3, { backgroundColor: currentTheme.shape1, opacity: 0.1 }]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={currentStep === 2 ? handlePreviousStep : () => navigation.goBack()}
                style={[styles.backButton, { backgroundColor: currentTheme.card }]}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={22} color={currentTheme.text} />
              </TouchableOpacity>

              <View style={styles.headerRight}>
                <Text style={[styles.headerText, { color: currentTheme.textSecondary }]}>Have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.headerLink, { color: currentTheme.primary }]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={true}
            >
              <View style={styles.brandContainer}>
                <View style={[styles.logoDot, { backgroundColor: currentTheme.primary }]} />
                <Text style={[styles.brandName, { color: currentTheme.text }]}>Bookie</Text>
                <View style={[styles.stepBadge, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                  <Text style={[styles.stepIndicator, { color: currentTheme.textSecondary }]}>Step {currentStep} of 2</Text>
                </View>
              </View>

              <Animated.View
                style={[
                  styles.formActual,
                  { backgroundColor: currentTheme.card, borderColor: currentTheme.border },
                  { transform: [{ translateY }] }
                ]}
              >
                {currentStep === 1 ? (
                  <>
                    <Text style={[styles.welcomeTitle, { color: currentTheme.text }]}>Create Account</Text>
                    <Text style={[styles.welcomeSubtitle, { color: currentTheme.textSecondary }]}>Join our community of book lovers</Text>

                    <Text style={[styles.sectionLabel, { color: currentTheme.textSecondary }]}>I want to join as</Text>
                    <View style={styles.roleOptions}>
                      <TouchableOpacity
                        style={[
                          styles.roleCard,
                          { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border },
                          role === 'USER' && [styles.roleCardSelected, { borderColor: currentTheme.primary, backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)' }]
                        ]}
                        onPress={() => setRole('USER')}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="book-outline"
                          size={28}
                          color={role === 'USER' ? currentTheme.primary : currentTheme.textSecondary}
                        />
                        <Text style={[
                          styles.roleText,
                          { color: currentTheme.textSecondary },
                          role === 'USER' && [styles.roleTextSelected, { color: currentTheme.primary }]
                        ]}>
                          Reader
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.roleCard,
                          { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border },
                          role === 'SELLER' && [styles.roleCardSelected, { borderColor: currentTheme.primary, backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)' }]
                        ]}
                        onPress={() => setRole('SELLER')}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="business-outline"
                          size={28}
                          color={role === 'SELLER' ? currentTheme.primary : currentTheme.textSecondary}
                        />
                        <Text style={[
                          styles.roleText,
                          { color: currentTheme.textSecondary },
                          role === 'SELLER' && [styles.roleTextSelected, { color: currentTheme.primary }]
                        ]}>
                          Seller
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Email Address</Text>
                      <View style={[
                        styles.inputWrapper,
                        { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border },
                        email.length > 0 && !isValidEmail(email) && styles.inputError
                      ]}>
                        <TextInput
                          style={[styles.input, { color: currentTheme.text }]}
                          placeholder="Your email address"
                          placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          editable={!isLoading}
                        />
                        {email.length > 0 && isValidEmail(email) && (
                          <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        { backgroundColor: currentTheme.primary },
                        (!email.trim() || !isValidEmail(email)) && styles.disabledButton
                      ]}
                      onPress={handleNextStep}
                      activeOpacity={0.8}
                      disabled={!email.trim() || !isValidEmail(email) || isLoading}
                    >
                      <Text style={styles.continueButtonText}>Continue</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={[styles.welcomeTitle, { color: currentTheme.text }]}>Almost there!</Text>
                    <Text style={[styles.welcomeSubtitle, { color: currentTheme.textSecondary }]}>Tell us a bit about yourself</Text>

                    <View style={styles.inputContainer}>
                      <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Full Name</Text>
                      <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border }]}>
                        <TextInput
                          style={[styles.input, { color: currentTheme.text }]}
                          placeholder="Your real name"
                          placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                          value={fullName}
                          onChangeText={setFullName}
                          autoCapitalize="words"
                          editable={!isLoading}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text style={[styles.inputLabel, { color: currentTheme.textSecondary }]}>Password</Text>
                      <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: currentTheme.border }]}>
                        <TextInput
                          style={[styles.input, { color: currentTheme.text }]}
                          placeholder="Create a strong password"
                          placeholderTextColor={isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          editable={!isLoading}
                        />
                        <TouchableOpacity
                          style={styles.eyeButton}
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={22}
                            color={currentTheme.textSecondary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {password.length > 0 && (
                      <View style={styles.passwordStrengthContainer}>
                        <View style={styles.passwordStrengthBars}>
                          <View style={[styles.strengthBar, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }, passwordStrength >= 1 && styles.weakStrength]} />
                          <View style={[styles.strengthBar, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }, passwordStrength >= 2 && styles.mediumStrength]} />
                          <View style={[styles.strengthBar, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }, passwordStrength >= 3 && styles.strongStrength]} />
                        </View>
                        <Text style={[styles.passwordStrengthText, { color: currentTheme.textSecondary }]}>
                          {passwordStrength < 2 ? 'Weak' : passwordStrength < 3 ? 'Medium' : 'Strong'}
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      style={[styles.signUpButton, { backgroundColor: currentTheme.primary }, (isLoading || password.length < 6) && styles.disabledButton]}
                      onPress={handleSignup}
                      activeOpacity={0.8}
                      disabled={isLoading || password.length < 6}
                    >
                      {isLoading ? (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="small" color="#fff" />
                          <Text style={[styles.signUpButtonText, { marginLeft: 10 }]}>Creating Account...</Text>
                        </View>
                      ) : (
                        <Text style={styles.signUpButtonText}>Complete Signup</Text>
                      )}
                    </TouchableOpacity>

                    <Text style={[styles.termsText, { color: currentTheme.textSecondary }]}>
                      By continuing, you agree to our{' '}
                      <Text style={[styles.termsLink, { color: currentTheme.primary }]}>Terms of Service</Text> and{' '}
                      <Text style={[styles.termsLink, { color: currentTheme.primary }]}>Privacy Policy</Text>
                    </Text>
                  </>
                )}
                <View style={styles.bottomPadding} />
              </Animated.View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}