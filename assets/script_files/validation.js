(function() {
    'use strict';
  
    // Get form elements
    var form = document.querySelector('.needs-validation');
    var emailInput = form.querySelector('input[name="email"]');
    var passwordInput = form.querySelector('input[name="password"]');
    var confirmPasswordInput = form.querySelector('input[name="confirm_password"]');
    var submitButton = form.querySelector('button[type="submit"]');
  
    // Add event listeners to form elements
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    form.addEventListener('submit', handleSubmit);
  
    // Validate email address
    function validateEmail(event) {
      if (!event.target.validity.valid) {
        event.target.classList.add('is-invalid');
        submitButton.disabled = true;
      } else {
        event.target.classList.remove('is-invalid');
        submitButton.disabled = false;
      }
    }
  
    // Validate password
    function validatePassword(event) {
      if (!event.target.validity.valid) {
        event.target.classList.add('is-invalid');
        submitButton.disabled = true;
      } else {
        event.target.classList.remove('is-invalid');
        submitButton.disabled = false;
      }
      validateConfirmPassword();
    }
  
    // Validate confirm password
    function validateConfirmPassword(event) {
      if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordInput.classList.add('is-invalid');
        submitButton.disabled = true;
      } else {
        confirmPasswordInput.classList.remove('is-invalid');
        submitButton.disabled = false;
      }
    }
  
    // Handle form submission
    function handleSubmit(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
      }
    }
  
  })();