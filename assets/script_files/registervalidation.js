
const form = document.getElementById("signup-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    form.addEventListener("submit", function(event) {
      if (!validateEmail(email.value)) {
        event.preventDefault();
        emailError.textContent = "Please enter a valid email address.";
        email.classList.add("is-danger");
      }

      if (!validatePassword(password.value)) {
        event.preventDefault();
        passwordError.textContent = "Password must be at least 8 characters long.";
        password.classList.add("is-danger");
      }
    });

    email.addEventListener("input", function(event) {
      if (validateEmail(email.value)) {
        emailError.textContent = "";
        email.classList.remove("is-danger");
      } else {
        emailError.textContent = "Please enter a valid email address.";
        email.classList.add("is-danger");
      }
    });

    password.addEventListener("input", function(event) {
      if (validatePassword(password.value)) {
        passwordError.textContent = "";
        password.classList.remove("is-danger");
      } else {
        passwordError.textContent = "Password must be at least 8 characters long.";
        password.classList.add("is-danger");
      }
    });

    function validateEmail(email) {
const emailRegex = /\S+@\S+.\S+/;
return emailRegex.test(email);
}
function validatePassword(password) {
  return password.length >= 8;
}



// password

const showPasswordIcon = document.querySelector('.show-password');
const passwordField = document.querySelector('input[type="password"]');

showPasswordIcon.addEventListener('click', () => {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    showPasswordIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordField.type = 'password';
    showPasswordIcon.innerHTML = '<i class="fas fa-eye"></i>';
  }
});