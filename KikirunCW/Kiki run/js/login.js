window.onload = checklogin;

function checklogin() {
  if (sessionStorage.loggedInUsername !== undefined) {
    let usrObject = JSON.parse(localStorage[sessionStorage.loggedInUsername]);
    document.getElementById("loginPara").innerHTML =
      usrObject.username + " logged in.";
  }
}

function login() {
  // get username
  let username = document.getElementById("username").value;

  // if user does not have an account
  if (localStorage[username] === undefined) {
    document.getElementById("loginFailure").innerHTML = "No such username";
    return;
  } else {
    // convert to object
    let usrObject = JSON.parse(localStorage[username]);
    let password = document.getElementById("Password").value;

    if (password === usrObject.password) {
      window.location.href = "/Kiki run/index.html";
      document.getElementById("loginFailure").innerHTML = "";
      sessionStorage.loggedInUsername = usrObject.username;
    } else {
      document.getElementById("loginFailure").innerHTML = "Incorrect password";
    }
  }
}
//logout function

function logout() {
  // Clear session storage or any other relevant data
  sessionStorage.removeItem("loggedInUsername");

  // Redirect to the login page or any other desired action
  window.location.href = "Kiki run/pages/login.html";
}

// Add an event listener to a button or any other element to trigger the logout function
document.getElementById("logoutButton").addEventListener("click", logout);
