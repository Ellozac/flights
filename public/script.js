let usernamePassword 
var slideIndex = 0;

function carousel() {
  if ( window.location.pathname == "/" | window.location.pathname == "/index.html"){
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.opacity = "0";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.opacity = "1";
    setTimeout(carousel, 4000); 
  };
}


if (window.location.pathname == "/subpages/devLog.html"){
  document.getElementById("loginForm").addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const username = document.getElementById('usernameField').value;
    const password = document.getElementById('passwordField').value;
    const usernamePassword = { username, password };
    console.log(usernamePassword);

    // Perform your custom logic here

    // Make the fetch request to "/devLog" when the form is submitted
    fetch("/devLog", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usernamePassword)

    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data); // Log the response from the server
        if (data.token) {
          localStorage.setItem("token", data.token);
          // document.cookie = "token=" + data.token + "; domain=*.localhost:8081x";
          // Redirect to a success page or perform other actions
          window.location.href = "../restrictedSubs/addFlight.html";
        } else {
          // Display an error message or perform other actions
          console.log("Login failed");
          alert("INCORRECT DETAILS");
        }
        
      });
  });
}
if (window.location.pathname == '/restrictedSubs/addFlight.html') {
  const token = localStorage.getItem('token');
  if (token) {
    // Make a fetch request to the server to validate the token
    fetch("/validateToken", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          // Token is valid, allow the user to access restricted content or perform other actions
          console.log('Authenticated');
        } else {
          // Token is invalid or expired, redirect to the login page or perform other actions
          console.log('Token is invalid or expired');
          window.location.href = '/subpages/devLog.html';
        }
      })
      .catch(error => {
        // Error occurred during token validation, handle the error appropriately
        console.log('Error:', error);
      });
  } else {
    // No token found, redirect to the login page or perfofrm other actions
    console.log('Not authenticated');
    window.location.href = '/subpages/devLog.html';
  }
}


carousel();


if (window.location.pathname === '/restrictedSubs/addFlight.html') {
  document.getElementById("flightAdd").addEventListener('submit', function(event) {
    const pilotName = document.getElementById("callSign").value;
    const aircraft = document.getElementById("typeOfAircraft").value;
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const duration = document.getElementById("duration").value;
    const simbrief = document.getElementById("simbrief").value;    
    const flightInfo = { pilotName, aircraft, origin, destination, duration, simbrief };
    fetch("/addFlight", { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(flightInfo)
  })
  })
}