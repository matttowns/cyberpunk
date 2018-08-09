let galleryNext = document.querySelector('#gallery-next-button');
galleryNext.addEventListener('click',(event)=>{
    incrementGallery();
});

let galleryPrevious = document.querySelector('#gallery-previous-button');
galleryPrevious.addEventListener('click',(event)=>{
    decrementGallery();
});


let incrementGallery = ()=>{
    for(let i = 0; i<canvasElements.length;i++){
        let canvas = canvasElements[i];
        if(canvas.dataset.id < glitchElements.length-1){
            canvas.dataset.id++;
        }
        else{
            canvas.dataset.id = 0;
        }
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let dummyImage = new Image();
        if(canvas.dataset.id ==0 ){
            dummyImage.src = glitchElements[glitchElements.length-1].src;            
        }
        else{
            dummyImage.src = glitchElements[canvas.dataset.id-1].src;
        }
        canvas.dataset.src =  dummyImage.src;
        ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,   
                0, 0, canvas.width, canvas.height); 
        canvas.removeEventListener('mouseenter',  glitchAnimationEnterEvent);
        canvas.addEventListener('mouseenter',  glitchAnimationEnterEvent);
    }    
};

let decrementGallery = ()=>{
    for(let i = 0; i<canvasElements.length;i++){
        let canvas = canvasElements[i];
        if(canvas.dataset.id > 0){
            canvas.dataset.id--;
        }
        else{
            canvas.dataset.id = glitchElements.length-1;
        }
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        let dummyImage = new Image();
        if(canvas.dataset.id ==0 ){
            dummyImage.src = glitchElements[glitchElements.length-1].src;            
        }
        else{
            dummyImage.src = glitchElements[canvas.dataset.id-1].src;
            
        }
        canvas.dataset.src =  dummyImage.src;
        ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                0, 0, canvas.width, canvas.height); 
        canvas.removeEventListener('mouseenter',  glitchAnimationEnterEvent);
        canvas.addEventListener('mouseenter',  glitchAnimationEnterEvent);
    }    
};