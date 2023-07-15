let usernamePassword 
var slideIndex = 0;

function carousel() {
  if ( window.location.pathname == "/index.html"){
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


// function submitLogin() {
//   const username = document.getElementById('usernameField').value;
//   const password = document.getElementById('passwordField').value;
//   usernamePassword = { username, password };
 
  
// }
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
      .then(response => response.text())
      .then(data => {
        // Handle the response data
        console.log(data); // Log the response from the server
        if (data === 'LOG') {
          // Redirect to a success page or perform other actions
          window.location.href = '../restrictedSubs/addFlight.html';
        } else {
          // Display an error message or perform other actions
          console.log('Login failed');
          alert("INCORRECT DETAILS")
        }
      });
  });
}
carousel();


