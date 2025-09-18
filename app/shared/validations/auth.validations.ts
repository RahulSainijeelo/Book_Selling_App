export type UserRole = 'USER' | 'SELLER';

export interface SignupFormData {
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getPasswordStrength = (password: string): number => {
  if (password.length === 0) return 0;
  if (password.length < 6) return 1;
  if (password.length < 8) return 2;
  
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  
  const strengthFactors = [hasSpecialChar, hasNumber, hasUpperCase, hasLowerCase].filter(Boolean).length;
  
  if (password.length >= 8 && strengthFactors >= 2) {
    return 3;
  }
  
  return 2;
};

export const validateForm = (
  email: string, 
  fullName: string, 
  password: string, 
  role: UserRole
) => {
  if (!email.trim() || !fullName.trim() || !password.trim() || !role) {
    return { isValid: false, error: 'Please fill in all fields', fieldErrors: {} };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Please enter a valid email address', fieldErrors: {} };
  }

  if (!/^[a-zA-Z\s]+$/.test(fullName.trim())) {
    return { isValid: false, error: 'Full name can only contain letters and spaces', fieldErrors: {} };
  }

  if (fullName.trim().length < 2 || fullName.trim().length > 50) {
    return { isValid: false, error: 'Full name must be between 2 and 50 characters', fieldErrors: {} };
  }

  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long', fieldErrors: {} };
  }

  if (!['USER', 'SELLER'].includes(role)) {
    return { isValid: false, error: 'Please select a valid role', fieldErrors: {} };
  }

  return { isValid: true, error: null, fieldErrors: {} };
};
