let gallery = document.getElementById('full-gallery');
let close = document.getElementById('full-gallery-close');
let galleryImage = document.getElementById('gallery-image');
let galleryItems = document.querySelectorAll('.gallery-item  img');
let nextButton = document.getElementById('full-gallery-next-button');
let previousButton = document.getElementById('full-gallery-previous-button');
let images = document.querySelectorAll('gallery-item');
let canvasItems = document.querySelectorAll('.gallery-item-canvas')

close.addEventListener('click', ()=>{
    gallery.classList.remove('gallery-open');
    overlay.classList.remove('overlay-open');
    document.body.classList.remove('fixed');
});

galleryItems.forEach((element)=>{
    element.addEventListener('click',(ev)=>{
        gallery.classList.add('gallery-open');
        overlay.classList.add('overlay-open');
        document.body.classList.add('fixed');
        if(wallpaperToggle){
            if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                galleryImage.src = element.dataset.src;
            }
            else{
                galleryImage.src = element.src;
            }
        }
        else{
            galleryImage.src = element.src.replace(/screenshot-/gi, "full-screenshot-");
        }
        galleryImage.dataset.id = element.dataset.id
    });
});

canvasItems.forEach((element)=>{
    element.addEventListener('click',(ev)=>{
        gallery.classList.add('gallery-open');
        overlay.classList.add('overlay-open');
        document.body.classList.add('fixed');
        galleryImage.dataset.id = element.dataset.id
        galleryImage.src = getImageUrl(galleryImage);   
    });
});

nextButton.addEventListener('click',(ev)=>{
    incrementFullGallery();
});

previousButton.addEventListener('click',(ev)=>{
    decrementFullGallery(); 
});

window.addEventListener('keydown',(ev)=>{
    if(ev.keyCode == 39){
        incrementFullGallery();
    }
    else if(ev.keyCode == 37){
        decrementFullGallery();
    }
});

function decrementFullGallery() {
    galleryImage.dataset.id--;
    if (galleryImage.dataset.id < 0) {
        galleryImage.dataset.id = glitchElements.length-1;
    }
    galleryImage.src = getImageUrl(galleryImage);
}

function incrementFullGallery(){
    galleryImage.dataset.id++;
    if(galleryImage.dataset.id > glitchElements.length-1){  
        galleryImage.dataset.id =0;
    }
    galleryImage.src = getImageUrl(galleryImage);
}

function getImageUrl(galleryImage){
    if(wallpaperToggle){
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth <992) {
            galleryImage.src = glitchElements[galleryImage.dataset.id].dataset.mobile;
        }
        else{
            galleryImage.src = glitchElements[galleryImage.dataset.id].dataset.src;
        }
    }
    else{        
        galleryImage.src = glitchElements[galleryImage.dataset.id].src.replace(/screenshot-/gi, "full-screenshot-");
    }
    return galleryImage.src;
}