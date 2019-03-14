let pulseElements = document.getElementsByClassName('pulse');

let pulse = (pulseElement)=>{
    let random = getRandom(2,10)*100;
    pulseElement.classList.toggle('active');
    setTimeout(pulse.bind(null, pulseElement), random);
};

for(let i=0;i<pulseElements.length;i++){
    pulse(pulseElements[i]);
}