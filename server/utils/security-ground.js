const otp = require("otp-generator");
const bcrypt = require("bcrypt");
const cache = require("./in-memory-cache.js");
const crypter = require("./encryption.js");
const { passwordStrength } = require("check-password-strength");
const regex = require("regex-username");
const validator = require('validator');
const secureRandomPassword = require('secure-random-password');
const randomUsernameGenerator = require('random-username-generator');

const otpGenerator = () => {
  return otp.generate(6);
};

const otpStoring = (temp_id, otp) => {
  if (cache.set(temp_id, otp, 300)) console.log("otp set for 5 minutes");
  else console.log("Could not store the otp");
};

const otpVerifier = (temp_id, otp) => {
  const retrievedOtp = cache.get(temp_id);
  if (retrievedOtp) {
    if (retrievedOtp === otp) return { result: true, code: 1 };

    return { result: false, code: 401 };
  }

  return { result: false, code: 500 };
};

const passwordHasher = password => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

const passwordVerifier = (realPassword, testedPassword) => {
  return bcrypt.compareSync(realPassword, testedPassword);
};

const temporary_id_generator = userid => {
  return crypter.encrypt(userid);
};

const id_decrypter = temp_id => {
  return crypter.decrypt(temp_id);
};

const verifyUserNameStrength = username => {
  if (username.length >= 6 && regex().test(username)) 
    return true;

  return false;
};

const verifyEmail = email => {
    return validator.isEmail(email);
};

const verify_phone_number = phone_number=>{
  return new RegExp("\\+3556[789]\\d{7}").test(phone_number);
}

const verifyPasswordStrength = password => {
  if (passwordStrength(password).value === "Strong") 
    return true;

  return false;
};

const password_generator = ()=>{
  return secureRandomPassword.randomPassword({
    length: 8,
    characters: secureRandomPassword.lower + secureRandomPassword.upper + secureRandomPassword.digits + secureRandomPassword.symbols,
  });
}

const username_generator = ()=>{
  return randomUsernameGenerator.generate();
}

module.exports = {
  otpGenerator: otpGenerator,
  otpStoring: otpStoring,
  otpVerifier: otpVerifier,
  passwordHasher: passwordHasher,
  passwordVerifier: passwordVerifier,
  temporary_id_generator: temporary_id_generator,
  id_decrypter: id_decrypter,
  verifyEmail: verifyEmail,
  verify_phone_number,
  verifyPasswordStrength: verifyPasswordStrength,
  verifyUserNameStrength: verifyUserNameStrength,
  password_generator: password_generator,
  username_generator: username_generator
};