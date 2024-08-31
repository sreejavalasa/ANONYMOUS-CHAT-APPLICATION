// Regular expression for validating email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for validating passwords
// This example requires at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Example function to validate email and password
export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password)=>{
    return passwordRegex.test(password);
}