let glitchFull = (image,canvas, counter,imagePositions, points)=>{
    
    let canvasRatio = canvas.width / canvas.height;
    if(counter < 3* 60){
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height, 50);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width,    image.height,     // source rectangle
                    (40+(canvasRatio*15)),0, canvas.width-(40+(canvasRatio*15)),  canvas.height-15);   
    }
    else if(counter >= 3 * 60 ){
        let arrayValue = 0;
        let ctx = canvas.getContext('2d');
        let arrayCounter = 0;
        let curveStart = getRandom(0,image.height);
        let ratio = (canvas.height - 15) / image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height, 50);

        let next = false;

           for(let i = canvas.height-11; i>=0;i--){
                if(!points[0].completed && imagePositions[points[0].peak].num != 8){
                    setPosition(points[0],imagePositions[i], i );
                }
                else if(imagePositions[points[0].peak].num == 8 && !points[0].completed){
                    points[0].completed = true;

                    for(let j = points[0].peak + points[0].moves[points[0].moves.length-1].upper; j<= points[0].peak + points[0].moves[points[0].moves.length-1].lower;j++){
                        imagePositions[j].num = 0;
                    }
                }
                if(imagePositions[points[0].peak].num >6 || points[0].completed){
                    setPosition(points[1],imagePositions[i], i );

                } 
                if(points[0].completed){
                    setPosition(points[2],imagePositions[i], i );
                } 

                    ctx.drawImage(image, 0,  0 + (i / ratio), image.width,    1/ ratio,     // source rectangle
                    (40 + 15*canvasRatio) + (imagePositions[i].move), 0 + i, canvas.width-(40 + 15*canvasRatio), 1);    
                    

            }
    }
    counter++;
    if(counter > 4.5 * 60){
        counter = 0;
        imagePositions = Array.apply(null, Array(canvas.height)).map(()=> ({num:0, max:false, move:0}));
        points.forEach((point)=>{
            point.completed = false;
        });
    }
        requestAnimationFrame(function () {
                glitchFull(image, canvas, counter,imagePositions, points );
            });

    function setPosition(point, imagePosition, index   ){

        point.moves.forEach((move, i)=>{
            if(i == 0){
                if(index >=point.peak+move.upper && index<point.peak+move.lower){
                   for(let j = 0; j<move.positions.length;j++){
                        if(imagePosition.num < point.num1 + (point.num1 * j)){
                            imagePosition.move = move.positions[j];
                            imagePosition.num++;
                            return;
                        }

                   }
                }
            } 
            else if((index < point.peak+point.moves[i-1].upper || index >= point.peak+point.moves[i-1].lower) && index >=point.peak+move.upper && index<point.peak+move.lower){
                   for(let j = 0; j<move.positions.length;j++){
                        if(imagePosition.num < point.num1 + (point.num1 * j)){
                            imagePosition.move = move.positions[j];
                            imagePosition.num++;
                            return;
                        }

                   }      
            }
        });
    }
}

let hoverGlitch = (image,canvas, startPosition, glitchArea, topArea, hoverCounter)=>{
        if(hoverCounter > 4* 60 && hoverCounter < 4.5 * 60){
            if(hoverCounter % 5 == 0){
                topArea =  Math.round((Math.random() * (1 - .3) + .3)*10)/10;
            }
        }
        if(hoverCounter % 4 == 0){
          var ctx = canvas.getContext("2d");
            let dummyImage = new Image();
            dummyImage.src = image;
            
            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                    0, 0, canvas.width, canvas.height); 
            
            let ratio = canvas.height / dummyImage.height;
            let targetArea = dummyImage.height * glitchArea;
            let startPoint =  dummyImage.height * startPosition;

            if(hoverCounter > 4* 60 && hoverCounter < 4.5 * 60){
                ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    (dummyImage.height* startPosition * (1-topArea)),     // source rectangle
                    0, 0, canvas.width, (canvas.height * startPosition)*(1-topArea));    

                for(let i = 0; i<(dummyImage.height * startPosition)*topArea;i++){
                    ctx.drawImage(dummyImage, 0,  (dummyImage.height * startPosition)*(1-topArea) + (i / ratio), dummyImage.width,    1 / ratio,     // source rectangle
                    getRandom(-1, 4), (canvas.height * startPosition)*(1-topArea) + i, canvas.width, 1);     
                }
            }
            else{
                ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height * startPosition,     // source rectangle
                    0, 0, canvas.width, canvas.height * startPosition);                    
            }

            for(let i = 0; i<targetArea;i++){
                ctx.drawImage(dummyImage, 0,  (dummyImage.height * startPosition) + (i / ratio), dummyImage.width,    1 / ratio,     // source rectangle
                getRandom(-1, 4), (canvas.height * startPosition) + i, canvas.width, 1);     
            }
            
            ctx.drawImage(dummyImage, 0, dummyImage.height * (glitchArea + startPosition), dummyImage.width,    dummyImage.height * glitchArea,     // source rectangle
                        0, canvas.height * (glitchArea + startPosition), canvas.width, canvas.height * glitchArea);     
            
                let d = ctx.getImageData(0,0,canvas.width, canvas.height);
                for (var i=0; i<d.data.length; i+=4) {
                        d.data[i] += 20;
                        d.data[i+1] += 20;
                        d.data[i+2] += 20;
                    }
                ctx.putImageData( d, 0, 0);
        }
        hoverCounter++;
        if(hoverCounter> 6*60){
            hoverCounter = 0;
        }

        if(canvas.classList.contains('canvas-active')){
            requestAnimationFrame(function () {
                    hoverGlitch(image, canvas, .45,.25,topArea,hoverCounter);
                });
        }
};     

let glitchAnimationEnterEvent = (event)=>{
    event.target.classList.add('canvas-active');
    let hoverCounter = 0;
    let topArea = 0;
    let canvas = event.target;
    var ctx = canvas.getContext("2d");
    let dummyImage = new Image();
    dummyImage.src = event.target.dataset.src;
    let ratio = canvas.height / dummyImage.height;
    let startPosition = .45;
    let glitchArea = .25;
    let targetArea = dummyImage.height * glitchArea;
    let startPoint =  dummyImage.height * startPosition;
    ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                    0, 0, canvas.width, canvas.height); 
    glitchHoverDraw();
    function glitchHoverDraw(){
        if(hoverCounter > 4* 60 && hoverCounter < 4.5 * 60 && hoverCounter % 5 == 0){
            topArea =  Math.round((Math.random() * (1 - .3) + .3)*10)/10;
        }
        if(hoverCounter % 4 == 0){
            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                    0, 0, canvas.width, canvas.height);
            if(hoverCounter > 4* 60 && hoverCounter < 4.5 * 60){
                ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    (dummyImage.height* startPosition * (1-topArea)),     // source rectangle
                    0, 0, canvas.width, (canvas.height * startPosition)*(1-topArea));    

                for(let i = 0; i<(dummyImage.height * startPosition)*topArea;i++){
                    ctx.drawImage(dummyImage, 0,  (dummyImage.height * startPosition)*(1-topArea) + (i / ratio), dummyImage.width,    1 / ratio,     // source rectangle
                    getRandom(-1, 4), (canvas.height * startPosition)*(1-topArea) + i, canvas.width, 1);     
                }
            } 
            else{
                ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height * startPosition,     // source rectangle
                    0, 0, canvas.width, canvas.height * startPosition);                    
            }

            for(let i = 0; i<targetArea;i++){
                ctx.drawImage(dummyImage, 0,  (dummyImage.height * startPosition) + (i / ratio), dummyImage.width,    1 / ratio,     // source rectangle
                getRandom(-1, 4), (canvas.height * startPosition) + i, canvas.width, 1);     
            }
            ctx.drawImage(dummyImage, 0, dummyImage.height * (glitchArea + startPosition), dummyImage.width,    dummyImage.height * glitchArea,     // source rectangle
                        0, canvas.height * (glitchArea + startPosition), canvas.width, canvas.height * glitchArea);     
            
                let d = ctx.getImageData(0,0,canvas.width, canvas.height);
                for (var i=0; i<d.data.length; i+=4) {
                        d.data[i] += 20;
                        d.data[i+1] += 20;
                        d.data[i+2] += 20;
                    }
                ctx.putImageData( d, 0, 0);
        }
        hoverCounter++;
        if(hoverCounter> 6*60){
            hoverCounter = 0;
        }
        if(canvas.classList.contains('canvas-active')){
            requestAnimationFrame(function () {
                glitchHoverDraw();
            });
        }
        canvas.addEventListener('mouseleave',()=>{
            canvas.classList.remove('canvas-active');
        });

    }

}

let glitchAnimationLeaveEvent = (event)=>{
    let canvas = event.target;
    let ctx = canvas.getContext("2d");
    let dummyImage = new Image();
    dummyImage.src = canvas.dataset.src;
    setTimeout(()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
        0, 0, canvas.width, canvas.height); 
    },50);
    canvas.classList.remove('canvas-active');
}

let glitchElements = document.querySelectorAll('.glitch');
let canvasElements = document.querySelectorAll('.gallery-item-canvas');
for(let i = 0; i<canvasElements.length;i++){
    let canvas = canvasElements[i];
    canvas.width = parseInt(getComputedStyle(canvas).width);
    canvas.height =  parseInt(getComputedStyle(canvas).height);

    if(glitchElements[i].complete){ // From cache
        let dummyImage = new Image();
        dummyImage.src = glitchElements[i].src;
        canvas.dataset.src = glitchElements[i].src;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
            0, 0, canvas.width, canvas.height); 
        canvas.addEventListener('mouseenter', glitchAnimationEnterEvent);
        canvas.addEventListener('mouseleave', glitchAnimationLeaveEvent);
    }
    else { // On load
        glitchElements[i].addEventListener('load', function() {
            let dummyImage = new Image();
            dummyImage.src = glitchElements[i].src;
            canvas.dataset.src = glitchElements[i].src;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                0, 0, canvas.width, canvas.height); 
            canvas.addEventListener('mouseenter', glitchAnimationEnterEvent);
            canvas.addEventListener('mouseleave', glitchAnimationLeaveEvent);
        });
    }
}

let glitchAutoElements = document.querySelectorAll('.glitch-auto');
for(let i = glitchAutoElements.length -1; i==0 ;i--){
    let canvas = glitchAutoElements[i].nextElementSibling;
    let timer = {};
    if(glitchAutoElements[i].complete){ // From cache
        var ctx = canvas.getContext("2d");
            canvas.setAttribute("width", glitchAutoElements[i].width+40);
            canvas.setAttribute("height", glitchAutoElements[i].height);
            let dummyImage = new Image();
            dummyImage.src = glitchAutoElements[i].src;
            let points = 
                [{peak:Math.floor((canvas.height - 15)*.8), num1:2, completed: false, moves:[
                    {upper:-2, lower:2, positions:[-35,-20,-35,0]},
                    {upper:-4, lower:3, positions:[-20,-10,-25,0]},
                    {upper:-5, lower:5, positions:[-15,5,-15,0]},
                    {upper:-7, lower:7, positions:[-10,10,-8,0]},
                    {upper:-9, lower:9, positions:[-6,-4,-6,0]}
                ]}, 
                {peak:Math.floor((canvas.height - 15)*.1), num1:2,  completed: false, moves:[
                    {upper:-2, lower:2, positions:[-20,-35,-20,0]},
                    {upper:-4, lower:3, positions:[-10,-8,-15,0]},
                    {upper:-6, lower:5, positions:[-8,6,-4,0]},
                    {upper:-8, lower:7, positions:[-2,4,-3,0]},
                ]}, 
                {peak:Math.floor((canvas.height - 15)*.6), num1:2, completed: false, moves:[
                    {upper:-2, lower:2, positions:[-24,-18,20,0]},
                    {upper:-3, lower:3, positions:[-15,-10,-13,0]},
                    {upper:-4, lower:4, positions:[-8,10,-7,0]},
                    {upper:-5, lower:5, positions:[-4,3,-4,0]},
                ]}
            ];
            let ratio = canvas.height / dummyImage.height;
            let imagePositions = Array.apply(null, Array(canvas.height)).map(()=> ({num:0, max:false, move:0}));

            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                0+40,0, canvas.width-40,  canvas.height);    
        requestAnimationFrame(function () {
            glitchFull(dummyImage, canvas,0, imagePositions, points);
        });
        glitchAutoElements[i].parentNode.removeChild(glitchAutoElements[i]);
    }
    else{
        glitchAutoElements[i].addEventListener('load', function() {
            var ctx = canvas.getContext("2d");
            canvas.setAttribute("width", glitchAutoElements[i].width+40);
            canvas.setAttribute("height", glitchAutoElements[i].height);
            let points = 
                [{peak:Math.floor((canvas.height - 15)*.8), num1:2, completed: false, moves:[
                    {upper:-2, lower:2, positions:[-35,-20,-35,0]},
                    {upper:-4, lower:3, positions:[-20,-10,-25,0]},
                    {upper:-5, lower:5, positions:[-15,5,-15,0]},
                    {upper:-7, lower:7, positions:[-10,10,-8,0]},
                    {upper:-9, lower:9, positions:[-6,-4,-6,0]}
                ]}, 
                {peak:Math.floor((canvas.height - 15)*.1), num1:2,  completed: false, moves:[
                    {upper:-2, lower:2, positions:[-20,-35,-20,0]},
                    {upper:-4, lower:3, positions:[-10,-8,-15,0]},
                    {upper:-6, lower:5, positions:[-8,6,-4,0]},
                    {upper:-8, lower:7, positions:[-2,4,-3,0]},
                ]}, 
                {peak:Math.floor((canvas.height - 15)*.6), num1:2, completed: false, moves:[
                    {upper:-2, lower:2, positions:[-24,-18,20,0]},
                    {upper:-3, lower:3, positions:[-15,-10,-13,0]},
                    {upper:-4, lower:4, positions:[-8,10,-7,0]},
                    {upper:-5, lower:5, positions:[-4,3,-4,0]},
                ]}
            ];
            let dummyImage = new Image();
            dummyImage.src = glitchAutoElements[i].src;
            let ratio = canvas.height / dummyImage.height;
            let imagePositions = Array.apply(null, Array(canvas.height)).map(()=> ({num:0, max:false, move:0}));
            ctx.drawImage(dummyImage, 0, 0, dummyImage.width,    dummyImage.height,     // source rectangle
                0+40,0, canvas.width-40,  canvas.height);    
            requestAnimationFrame(function () {
                glitchFull(dummyImage, canvas,0, imagePositions, points);
            });
            glitchAutoElements[i].parentNode.removeChild(glitchAutoElements[i]);

        });
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



