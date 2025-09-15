import { Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { validateForm, UserRole } from '../validations/auth.validations';
import api from '../../services/api.service';

interface SignupParams {
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
  setIsLoading: (loading: boolean) => void;
  setStoreLoading: (loading: boolean) => void;
  loginUser: (user: any, token: string) => void;
  navigation: any;
}

export const handleSignupSubmission = async ({
  email,
  fullName,
  password,
  role,
  setIsLoading,
  setStoreLoading,
  loginUser,
  navigation,
}: SignupParams) => {
  // Validation
  const validation = validateForm(email, fullName, password, role);
  if (!validation.isValid) {
    Alert.alert('Error', validation.error!);
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
      role: role,
    };

    console.log('Registration data:', { ...registrationData, password: '[HIDDEN]' });

    const response = await api.post('/api/auth/register', registrationData);
    
    console.log('Registration response:', response.data);

    if (response.status === 200 || response.status === 201) {
      const { id, name, email: userEmail, role: userRole, token } = response.data;

      if (!token) {
        throw new Error('Token not found in response');
      }

      try {
        const decodedToken: any = jwtDecode(token);
        
        console.log('Decoded JWT token:', decodedToken);
        
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          throw new Error('Token is expired');
        }
        
        const user = {
          id: decodedToken.id || id,
          name: name || decodedToken.name || fullName.trim(),
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
          'Success! 🎉', 
          `Welcome ${user.name}!\n${roleText.charAt(0).toUpperCase() + roleText.slice(1)} account created successfully.\n\nToken expires: ${expiryDate}`,
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
          role: userRole || role
        };

        loginUser(fallbackUser, token);
        
        const roleText = role === 'SELLER' ? 'seller' : 'reader';
        Alert.alert(
          'Success! 🎉', 
          `Welcome ${name}!\n${roleText.charAt(0).toUpperCase() + roleText.slice(1)} account created successfully.`,
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
