let registrationSection = document.getElementById('registration-section');
let emailInput = document.getElementById('registration-email-input');
let emailLabel = document.getElementById('registration-email-label');
let emailCursor = document.getElementById('registration-cursor');
let submitButton = document.getElementById('registration-submit-button');
let registrationDeclaration = document.getElementById('registration-declaration');
let checkbox = registrationDeclaration.nextElementSibling;
let checkboxClicked = false;
let signupDeclaration = document.getElementById('signup-declaration');

const DEFAULT_LABEL = "Enter your email address";
const ERROR_LABEL = "Provide correct e-mail address";

window.addEventListener('scroll',()=>{
    let signupSection = document.querySelector('.signup-section');
    let gallery = document.querySelector('.gallery');
    if(window.pageYOffset > window.innerHeight){
        signupSection.classList.add('fixed');
        gallery.classList.add('fixed-sign-up');
    }
    else{
        signupSection.classList.remove('fixed');
        gallery.classList.remove('fixed-sign-up');
    }
});

emailInput.addEventListener('focusin',(ev)=>{
    if(emailInput.value.length==0){
        emailLabel.classList.add('registration-email-entered');
        emailCursor.classList.add('entered');
        signupDeclaration.classList.add('signup-open')
    }
});

emailInput.addEventListener('focusout',(ev)=>{
    setTimeout(()=>{
        if(emailInput.value.length==0 && !checkboxClicked){
            signupDeclaration.classList.remove('signup-open')
        }
    },150);
});
    
checkbox.addEventListener('click',(ev)=>{
    checkboxClicked = true;
    signupDeclaration.classList.add('signup-open');
    setTimeout(()=>{
        checkboxClicked = false;
    },200);
})

emailInput.addEventListener('focusout',(ev)=>{
    if(emailInput.value.length==0){
        emailLabel.classList.remove('registration-email-entered');
        emailInput.classList.remove('entered');
        emailCursor.classList.remove('entered');
        emailLabel.innerText = DEFAULT_LABEL;
        emailLabel.classList.remove('invalid-email');
    }
});

emailInput.addEventListener('keydown',(ev)=>{
    //slight delay to allow textbox to update
    setTimeout(()=>{
        let validForm = formValidation();
        if(emailInput.value.length==0){
            emailInput.classList.remove('entered');
            emailCursor.classList.remove('hidden');
            emailInput.classList.remove('value-entered');
        }
        else{
            emailInput.classList.remove('entered');
            emailCursor.classList.add('hidden');
            emailInput.classList.add('value-entered');
        }        
        if(validForm.email){
            emailLabel.innerText = DEFAULT_LABEL;
            emailLabel.classList.remove('invalid-email');
        }
        else{
            emailLabel.innerText = ERROR_LABEL;
            emailLabel.classList.add('invalid-email');
        }
        if(validForm.email && validForm.declaration){
            submitButton.disabled = false;
        }
        else{
            submitButton.disabled = true;
        }
    },10);
});

let validateEmail = (email)=> {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

let formValidation = ()=> {
    return {email: validateEmail(emailInput.value), declaration: registrationDeclaration.checked};
}