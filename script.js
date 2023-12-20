// script.js
document.getElementById('contactForm').addEventListener('submit', function (event) {
    //event.preventDefault();
  
    // Basic email validation
    const email = document.getElementById('email').value;
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    const formData = {
      name: document.getElementById('name').value,
      email: email,
      message: document.getElementById('message').value
    };
  
    // Send data to the back-end
    sendDataToBackend(formData);
  });
  
  function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function sendDataToBackend(formData) {
    // Define the API endpoint URL
    const apiUrl = 'http://localhost:3000/submitForm'; // Replace with your actual server URL
  
    // Use the fetch API to send a POST request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(formData), // Convert the formData to JSON
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the success response from the server
        console.log(data);
      })
      .catch(error => {
        // Handle errors during the fetch
        console.error('Error during fetch:', error);
      });
  }
  
  