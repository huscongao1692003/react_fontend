import React from "react";

function containsSpecialCharacters(str) {
  let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return regex.test(str);
}

function validateName(name) {
  // Validate username
  if (name.length < 5) {
    return {
      isError: true,
      message: "Username must be at least 5 characters long"
    }
  } else if (containsSpecialCharacters(name)) {
    return {
      isError: true,
      message: "Username must not contain special characters"
    }
  } 

  return {
    isError: false,
    message: ""
  }
}

function validateMobilePhone(phone) {
  var reg = /^\d+$/;
  if (!phone.match(reg)) {
    return {
      isError: true,
      message: "Your phone cannot include string and special characters"
    }
  }
  else if(phone.length >= 11 || !phone.startsWith("0")) {
    return {
      isError: true,
      message: "Your phone is not valid"
    }
  } 
  return {
    isError: false,
    message: ""
  }
}

function validatePassword(password) {
  let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if(!password.match(pattern)) {
    return {
      isError: true,
      message: "password contain at least 8 character in which exists 1 number, 1 lowercase and uppercase charaters"
    }
  } 
  return {
    isError: false,
    message: ""
  }
}

function validateConfirmPassword(password, confirmPassword) {
  if(password !== confirmPassword) {
    return {
      isError: true,
      message: "Confirm Password must be the same password"
    }
  }
  return {
    isError: false,
    message: ""
  }
}

function validateConfirmEmail(email, confirmEmail) {
  if(email !== confirmEmail) {
    return {
      isError: true,
      message: "Confirm Email must be the same password"
    }
  }
  return {
    isError: false,
    message: ""
  }
}


export { validateConfirmPassword, validateName, validatePassword, validateMobilePhone, validateConfirmEmail };
