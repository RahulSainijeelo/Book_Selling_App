import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  
  // Header
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  loginHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginHeaderText: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
    marginRight: 8,
  },
  loginHeaderLink: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Scroll Container
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  // Form Container
  loginFormContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    minHeight: height * 0.75,
  },

  // Brand
  loginBrandContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginBrandName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#8B5CF6',
    letterSpacing: -1,
  },

  // Welcome Section
  loginWelcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginWelcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },

  // Role Selection
  roleSelectionContainer: {
    marginBottom: 24,
    zIndex: 1000,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  roleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  roleSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleSelectorText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
  },
  roleDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  roleOptionSelected: {
    backgroundColor: '#f3f0ff',
  },
  roleOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },

  // Form Inputs
  loginInputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  loginInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 56,
  },
  loginInputError: {
    borderColor: '#ff4757',
    backgroundColor: '#fff5f5',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 52,
  },
  loginInputIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 18,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ff4757',
    marginTop: 4,
    marginLeft: 4,
  },

  // Buttons
  signInButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#bbb',
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
});
