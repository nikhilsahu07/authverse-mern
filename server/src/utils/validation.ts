import { VALIDATION } from './constants.js';

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation regex pattern
 * At least 8 characters, one uppercase, one lowercase, one digit, and one special character
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

/**
 * Name validation regex pattern (letters, spaces, hyphens, apostrophes)
 */
const NAME_REGEX = /^[a-zA-Z\s\-']+$/;

/**
 * Validation result interface
 */
export interface IValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): IValidationResult => {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate password
 */
export const validatePassword = (password: string): IValidationResult => {
  const errors: string[] = [];

  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`);
    }
    if (password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
      errors.push(`Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters`);
    }
    if (!PASSWORD_REGEX.test(password)) {
      errors.push(
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate name (first name or last name)
 */
export const validateName = (name: string, fieldName = 'Name'): IValidationResult => {
  const errors: string[] = [];

  if (!name) {
    errors.push(`${fieldName} is required`);
  } else {
    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
      errors.push(`${fieldName} must be at least ${VALIDATION.NAME_MIN_LENGTH} characters long`);
    }
    if (name.length > VALIDATION.NAME_MAX_LENGTH) {
      errors.push(`${fieldName} must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`);
    }
    if (!NAME_REGEX.test(name)) {
      errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate registration request
 */
export const validateRegistration = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): IValidationResult => {
  const errors: string[] = [];

  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors);
  }

  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }

  // Validate first name
  const firstNameValidation = validateName(data.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.push(...firstNameValidation.errors);
  }

  // Validate last name
  const lastNameValidation = validateName(data.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.push(...lastNameValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate login request
 */
export const validateLogin = (data: { email: string; password: string }): IValidationResult => {
  const errors: string[] = [];

  if (!data.email) {
    errors.push('Email is required');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate password change request
 */
export const validatePasswordChange = (data: { currentPassword: string; newPassword: string }): IValidationResult => {
  const errors: string[] = [];

  if (!data.currentPassword) {
    errors.push('Current password is required');
  }

  const newPasswordValidation = validatePassword(data.newPassword);
  if (!newPasswordValidation.isValid) {
    errors.push(...newPasswordValidation.errors);
  }

  if (data.currentPassword === data.newPassword) {
    errors.push('New password must be different from current password');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate profile update request
 */
export const validateProfileUpdate = (data: { firstName?: string; lastName?: string }): IValidationResult => {
  const errors: string[] = [];

  if (data.firstName !== undefined) {
    const firstNameValidation = validateName(data.firstName, 'First name');
    if (!firstNameValidation.isValid) {
      errors.push(...firstNameValidation.errors);
    }
  }

  if (data.lastName !== undefined) {
    const lastNameValidation = validateName(data.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
      errors.push(...lastNameValidation.errors);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize string input (trim and remove extra whitespaces)
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Normalize email (convert to lowercase and trim)
 */
export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Validate UUID format
 */
export const isValidUUID = (uuid: string): boolean => {
  const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return UUID_REGEX.test(uuid);
};
