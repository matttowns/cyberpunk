let slideLeft = document.querySelectorAll('.slide-from-left');
registerListener('load', slideIn);
registerListener('scroll', slideIn);
registerListener('resize', slideIn);


function slideIn(){
    for(let i = 0; i< slideLeft.length;i++){
        if(isInViewport(slideLeft[i])){
            slideLeft[i].style.transform = "translateX(0)";
        }
    }
}

function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
}
function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}

