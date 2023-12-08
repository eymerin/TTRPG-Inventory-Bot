const loginFormHandler = async (event) => {
    event.preventDefault();
  
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
          document.location.replace('/'); // Redirect to the home page or desired location
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
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);