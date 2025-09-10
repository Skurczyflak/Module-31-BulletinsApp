const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^\+?\d{1,3}[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4,11}$/;
  return regex.test(phoneNumber);
}

module.exports = isValidPhoneNumber