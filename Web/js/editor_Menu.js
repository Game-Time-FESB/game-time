//everything is called Account because the code was copyed from menu
//this needs a clean up down the line but we have no time for that now

const urlPB = sessionStorage.getItem('urlPB');
const portPB = sessionStorage.getItem('portPB');

const myUsername = sessionStorage.getItem('myUsername');

console.log(myUsername);



document.addEventListener('DOMContentLoaded', function () {
    
    // Number of account containers you want to create
    const numberOfContainers = 4;
  
    // Reference to the parent element where account containers will be appended
    const accountContainersParent = document.getElementById('accountContainers');
  
    // Function to create account containers
    function createAccountContainers() {
      

        fetch(`http://${urlPB}:${portPB}/user-info/?username=${myUsername}`, {  
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server as needed
            //console.log('Server response:', data);
            const adminOf = data["admin_of"]
            console.log(adminOf);

            const count = Object.keys(adminOf).length;;

            for (let i = 0; i < count; i++) {
                // Create a new account container element
                const accountContainer = document.createElement('div');
                accountContainer.classList.add('account');
        
                // Create a new anchor element with a placeholder link
                const accountLink = document.createElement('a');
                accountLink.textContent = adminOf[i+1];
        
                // Append the anchor element to the account container
                accountContainer.appendChild(accountLink);

                // Add an event listener to the account container
                accountContainer.addEventListener('click', function () {

                    sessionStorage.setItem('editorLeague', adminOf[i+1]);

                    console.log(adminOf[i+1]);
                    
                    window.location.href = "editor_Details.html";

                });

                // Append the account container to the parent element
                accountContainersParent.appendChild(accountContainer);
            
            }


        })
        .catch(error => {console.error('Error:', error);
        });
       
    }
  
    // Call the function to create account containers
    createAccountContainers();
  });