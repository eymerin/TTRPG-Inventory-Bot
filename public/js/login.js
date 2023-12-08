// Define the login form handler function
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
      try {
          console.log('Sending login request...');
          const response = await fetch('/api/users/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          console.log('Response status:', response.status);

          if (response.ok) {
              // Handle successful login response
              const responseData = await response.json();
              console.log('Login successful:', responseData); // Log the response data
              // Do not redirect here to prevent page refresh
          } else {
              // Handle failed login response
              alert('Failed to log in');
          }
      } catch (error) {
          console.error('Error:', error);
          // Handle network errors or other exceptions
          alert('Error occurred while logging in');
      }
  }
};
console.log('User logged in. Session keeping');
// Add an event listener to the form by its id
document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);