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