const form = document.querySelector("#create-account-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

/* creating an event listener */
form.addEventListener("submit", (event) => {
  // at first preventing the form from submitting so validation checks can be done
  // event.preventDefault();

  validateForm();

  // if the form result is valid, submit, else prevent default.
  if (isFormValid() == true) {
    form.submit();
  } else {
    event.preventDefault();
  }
});

//form validation
function isFormValid() {
  //selecting all div's which contains input-group tag
  const inputContainers = form.querySelectorAll(".input-group");
  let result = true;
  inputContainers.forEach((container) => {
    // when any of the container contains error class result will be false else result is true
    if (container.classList.contains("error")) {
      result = false;
    }
  });

  return result;
}

// validation checks
function validateForm() {
  // username
  if (usernameInput.value.trim() == "") {
    // setError is a function
    setError(usernameInput, "Name cannot be empty!");
  } else if (
    usernameInput.value.trim().length < 5 ||
    usernameInput.value.trim().length > 15
  ) {
    setError(usernameInput, "Name min 5 and max 15 character!");
  } else {
    setSuccess(usernameInput);
  }

  // email
  if (emailInput.value.trim() == "") {
    setError(emailInput, "Provide email address!");
  } else if (isEmailValid(emailInput.value)) {
    // if the email address is valid
    setSuccess(emailInput);
  } else {
    setError(emailInput, "Provide valid email address!");
  }

  // password
  if (passwordInput.value.trim() == "") {
    setError(passwordInput, "password cannot be empty!");
  } else if (
    passwordInput.value.trim().length < 6 ||
    passwordInput.value.trim().length > 20
  ) {
    setError(passwordInput, "Password min 6 and max 20 characters!");
  } else {
    setSuccess(passwordInput);
  }

  // confirm pasword
  if (confirmPasswordInput.value.trim() == "") {
    setError(confirmPasswordInput, "Please confirm password!");
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    setError(confirmPasswordInput, "Password does not match!");
  } else {
    setSuccess(confirmPasswordInput);
  }
}

//N/B: the element in this code base is a variable created for the id selectors ifg what i mean lol

// error function
function setError(element, errorMessage) {
  // calling the parent element into a variable called parent and giving it a class name called error
  const parent = element.parentElement;
  // if parent element contains success
  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }
  parent.classList.add("error");
  // selecting the paragraph tag p
  const paragraph = parent.querySelector("p");
  paragraph.textContent = errorMessage;
}

// success function
function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
  parent.classList.add("success");
}

// is email valid function
function isEmailValid(email) {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return reg.test(email);
}
