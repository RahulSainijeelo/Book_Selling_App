import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // Background shapes
  bgShape1: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.25,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    opacity: 0.6,
  },
  bgShape2: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.35,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    opacity: 0.4,
  },
  bgShape3: {
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.1,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },

    }),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    marginRight: 10,
    fontWeight: '500',
  },
  headerLink: {
    fontSize: 14,
    fontWeight: '900',
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  brandName: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  stepBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginLeft: 16,
  },
  stepIndicator: {
    fontSize: 12,
    fontWeight: '900',
  },

  formActual: {
    padding: 28,
    borderRadius: 36,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 30,
      },
    }),
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 3,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 18,
    marginLeft: 6,
  },
  roleOptions: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  roleCard: {
    flex: 1,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  roleCardSelected: {
    // defined in component
  },
  roleText: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 12,
  },
  roleTextSelected: {
    // defined in component
  },

  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 60,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  eyeButton: {
    padding: 10,
  },

  continueButton: {
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
      },
    }),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 10,
  },
  disabledButton: {
    opacity: 0.4,
  },

  passwordStrengthContainer: {
    marginBottom: 28,
  },
  passwordStrengthBars: {
    flexDirection: 'row',
    height: 5,
    marginBottom: 10,
  },
  strengthBar: {
    flex: 1,
    height: '100%',
    borderRadius: 3,
    marginHorizontal: 3,
  },
  weakStrength: {
    backgroundColor: '#EF4444',
  },
  mediumStrength: {
    backgroundColor: '#F59E0B',
  },
  strongStrength: {
    backgroundColor: '#10B981',
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },

  signUpButton: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 15,
      },
    }),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },

  termsText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 30,
  },
  termsLink: {
    fontWeight: '900',
  },
  bottomPadding: {
    height: 30,
  },
});
