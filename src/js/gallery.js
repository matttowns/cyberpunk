let transitioning = false;
let wallpaperToggle = false;
let galleryCanvasList = document.getElementById('gallery-canvas-list');
let galleryImageList  =document.getElementById('gallery-item-list');
let screenshotButton = document.getElementById('screenshot-button');
let wallpaperButton = document.getElementById('wallpaper-button');

wallpaperButton.addEventListener('click',(ev)=>{
    if(!wallpaperToggle){
        wallpaperToggle = true;
        setWallpaperItems();
        galleryCanvasList.classList.add('gallery-wallpaper');
        galleryImageList.classList.add('gallery-wallpaper');
        wallpaperButton.classList.add('active');
        screenshotButton.classList.remove('active');
        setHeights();
        resetCanvases();
        createGallery(); 
        loadIn();
    }
});

let setWallpaperItems = ()=>{
    glitchElements = document.getElementsByClassName('wallpaper-item');
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth	<992) {
            for(let i=0;i<glitchElements.length;i++){
                glitchElements[i].src = glitchElements[i].dataset.mobile;
            }
        }
        else{
            for(let i=0;i<glitchElements.length;i++){
                glitchElements[i].src = glitchElements[i].dataset.src;
            }
        }
}

screenshotButton.addEventListener('click',(ev)=>{
    if(wallpaperToggle){
        wallpaperToggle = false;
        glitchElements = document.querySelectorAll('.glitch.screenshot-item');   
        galleryCanvasList.classList.remove('gallery-wallpaper'); 
        galleryImageList.classList.remove('gallery-wallpaper');

        wallpaperButton.classList.remove('active'); 
        screenshotButton.classList.add('active'); 
        setHeights();
        resetCanvases();
        createGallery(); 
        loadIn();
    }
});

let galleryNext = document.querySelector('#gallery-next-button');
galleryNext.addEventListener('click',(event)=>{
    if(!transitioning){
        transitioning = true;
        incrementGallery();
    }
});

let galleryPrevious = document.querySelector('#gallery-previous-button');
galleryPrevious.addEventListener('click',(event)=>{
    if(!transitioning){
        transitioning = true;
        decrementGallery();
    }
});

let getCanvasCount = ()=>{
    if(galleryCanvasList.classList.contains('gallery-wallpaper')){
        wallpaperToggle = true;
        return 3;
    }
    wallpaperToggle = false;
    return 4;
}

let incrementGallery = ()=>{
    let incrementAmount = wallpaperToggle ? 3 : 1;
    for(let i = 0; i<getCanvasCount();i++){
        let canvas = canvasElements[i];
        canvas.dataset.oldId =canvas.dataset.id;
        canvas.dataset.id = parseInt(canvas.dataset.id) + incrementAmount;
        if(canvas.dataset.id > glitchElements.length - 1){
            canvas.dataset.id = 0 + (canvas.dataset.id - glitchElements.length);
        }
        drawCanvas(canvas);
    }    
};

let loadIn = ()=>{
    for(let i = 0; i<getCanvasCount();i++){
        let canvas = canvasElements[i];
        canvas.dataset.oldId =canvas.dataset.id;

        drawCanvas(canvas);
    }    
}

let decrementGallery = ()=>{
    let decrementAmount = wallpaperToggle ? 3 : 1;
    for(let i = 0; i<getCanvasCount();i++){
        let canvas = canvasElements[i];
        canvas.dataset.oldId =canvas.dataset.id;
        canvas.dataset.id = parseInt(canvas.dataset.id) - decrementAmount;
        if(canvas.dataset.id < 0){
            canvas.dataset.id = glitchElements.length + parseInt(canvas.dataset.id);
        }
        drawCanvas(canvas);
    }    
};

let drawCanvas = (canvas)=>{
    let ctx = canvas.getContext("2d");
    let originalImage = copyImage(glitchElements[canvas.dataset.oldId]);
    let dummyImage = copyImage(glitchElements[canvas.dataset.id])
    canvas.dataset.src =  dummyImage.src;
    let counter = 0;
    let heightArray = splitHeight(canvas.height);
    let completedArray = [];
    draw();        
    canvas.removeEventListener('mouseenter',  glitchAnimationEnterEvent);
    canvas.addEventListener('mouseenter',  glitchAnimationEnterEvent);

    function draw(){
        completedArray = completedArray.concat(heightArray[counter]);
        let ratio = dummyImage.height / canvas.height;
        for(let i =0; i<canvas.height;i++){

            if(completedArray.includes(i)){
                ctx.drawImage(dummyImage, getRandom(-10,10), i * ratio, dummyImage.width,    1 * ratio,   
                getRandom(-10,10), i, canvas.width,1);
            }
            else{
                ctx.drawImage(originalImage, getRandom(-10,10), i * ratio, originalImage.width,     1 * ratio,   
                getRandom(-10,10), i, canvas.width,1);
            }
        }
        counter++;
        if(counter <heightArray.length && !canvas.classList.contains('canvas-active')){
            setTimeout(draw,10);
        }
        else{
            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,   
                0, 0, canvas.width,canvas.height);
            transitioning = false;

        }
    }
}

let splitHeight = (height)=>{
    let splitArray = [];
    let subArraySize = height / 30;
    let baseArray = [];
    for(let i =0; i<height;i++){
        baseArray.push(i);
    }
    
    for(let i = 0; i<subArraySize; i++){
        let newArray = [];
        for(let j = 0; j<30;j++){
            if(baseArray.length >0){
                let rand = Math.random();
                let position = rand * baseArray.length;
                newArray.push(baseArray.splice(position,1)[0]);
            }
        }
        splitArray.push(newArray);
    }   
    return splitArray;
}

let copyImage = (image)=>{
    let copy = new Image();
    copy.src = image.src;
    return copy;
}

let setHeights = ()=>{
    if(wallpaperToggle)
    {
        canvasElements.forEach((canvas)=>{
            canvas.style.height = canvas.offsetWidth * .5785567496105868 + "px"

        });
        galleryCanvasList.style.height = canvasElements[0].offsetWidth * .5785567496105868 + "px"

    }
    else{
        galleryCanvasList.style.height = canvasElements[0].offsetWidth * 1.740157480314961 + "px"

        canvasElements.forEach((canvas)=>{
            canvas.style.height = galleryCanvasList.style.height
        });
    }
}

window.addEventListener('resize',()=>{
    if(wallpaperToggle){
        setWallpaperItems();
    }
    setHeights();
    resetCanvases();
    createGallery(); 
})
