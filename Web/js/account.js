'use strict';

const editButton=document.querySelector('#edit-button')

editButton.addEventListener('click', editAccount)

function editAccount(e){
    const saveButton=e.target;
    /*mijenja izgled elemenata*/
    saveButton.style.background="lightgreen";
    saveButton.style.border="lightgreen";
    saveButton.innerText="Save";

    const exitButton=document.querySelector('#sign-out-button')
    exitButton.innerText="Exit"
    /*omogućava mijenjanje polja fullname, email i password*/ 
    const fullName=document.getElementById('fullname')
    fullName.removeAttribute('readonly')

    const email=document.getElementById('email')
    email.removeAttribute('readonly')

    const password=document.getElementById('password')
    password.removeAttribute('readonly')
    
    

    exitButton.addEventListener('click', revertAccount)
    /*vrati sve na onako kako je bilo prije*/ 
    function revertAccount(){
        exitButton.innerText="Sign out"
        saveButton.style.background="#f6f6f6ff"
        saveButton.style.border="#f6f6f6ff"
        saveButton.innerText="Edit"

        fullName.setAttribute("readonly","disabled")
        email.setAttribute("readonly","disabled")
        password.setAttribute("readonly","disabled")
        fullName.value=''
        email.value=''
        password.value=''
        
        exitButton.removeEventListener('click',revertAccount)
    }
}