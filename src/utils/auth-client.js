const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const validatePhone = (phone) => {
  const pattern = /^(?:\+98|0)?9\d{9}$/;
  return pattern.test(phone);
};

const validatePassword = (password) => {
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  return pattern.test(password);
};

export { validateEmail, validatePhone, validatePassword };
