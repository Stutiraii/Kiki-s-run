let showMessage = document.getElementById("showMessage");

//store user inputs
function storeUser() {
  var usrObject = {
    username: username,
    email: email,
    password: password,
    Gender: Gender,
  };
  usrObject.email = document.getElementById("email").value;
  usrObject.username = document.getElementById("username").value;
  usrObject.password = document.getElementById("password").value;
  usrObject.Gender = document.getElementById("Gender").value;
  usrObject.score = 0;
  if (
    !usrObject.username ||
    !usrObject.email ||
    !usrObject.password ||
    !usrObject.Gender
  ) {
    showMessage.innerHTML = "All forms must be completed.";
    return;
  }

  var userData = {
    username: usrObject.username,
    password: usrObject.password,
    email: usrObject.email,
    Gender: usrObject.Gender,
    score: usrObject.score,
  };

  localStorage.setItem(userData.username, JSON.stringify(userData));

  //inform results
  document.getElementById("Result").innerHTML =
    "<b>Registration succesful.</b>";
  window.location.replace("/Kiki run/pages/login.html");
}

// Minimum eight characters, at least one letter and one number:
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//email
function checkEmail() {
  let email = document.getElementById("email").value;
  let showMessage = document.getElementById("showMessage");

  if (email === "") {
    showMessage.innerHTML = "Please enter a email";
    return false;
  }

  if (!emailRegex.test(email)) {
    showMessage.innerHTML = "Invalid email";
    return false;
  }

  showMessage.innerHTML = ""; // Clear previous messages
  return true;
}

//username
// ...
function checkUsername() {
  let username = document.getElementById("username").value;
  let showMessage = document.getElementById("showMessage");

  if (username === "") {
    showMessage.innerHTML = "Please enter a username";
    return false;
  }

  showMessage.innerHTML = ""; // Clear previous messages
  return true;
}

function checkPassword() {
  let password = document.getElementById("password").value;
  let showMessage = document.getElementById("showMessage");

  if (!passwordRegex.test(password)) {
    showMessage.innerHTML =
      "Password must be at least eight characters long and include at least one letter and one number";
    return false;
  }

  showMessage.innerHTML = ""; // Clear previous messages
  return true;
}

function confirmPassword() {
  let confirmation = document.getElementById("confirmPassword");
  let showMessage = document.getElementById("showMessage");

  if (confirmation.value !== document.getElementById("password").value) {
    showMessage.innerHTML = "Mismatched password";
    return false;
  }

  showMessage.innerHTML = ""; // Clear previous messages
  return true;
}
//Gender
function checkGender() {
  let gender = document.getElementById("Gender").value;
  let showMessage = document.getElementById("showMessage");

  if (gender === "") {
    showMessage.innerHTML = "Please select a gender";
    return false;
  }

  showMessage.innerHTML = ""; // Clear previous messages
  return true;
}

function validateForm() {
  if (
    checkUsername() &&
    checkPassword() &&
    confirmPassword() &&
    checkEmail() &&
    checkGender()
  ) {
    // All validations passed, proceed with form submission or other actions
    storeUser();
    setTimeout(function () {
      window.location.href = "/Kiki run/pages/login.html";
    }, 1000);
    return true;
  } else {
    // Validation failed, prevent form submission
    return false;
  }
}
