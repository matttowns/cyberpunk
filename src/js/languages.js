let footer = document.getElementById('footer');
let dropdown = document.getElementById('footer-language-dropdown');
let countryList = dropdown.getElementsByTagName('ul')[0];

footer.addEventListener('mouseover',(ev)=>{
    if(composedPath(ev.target).includes(dropdown) || ev.target == countryList){
        countryList.classList.add('show-languages');
    }
    else{
       countryList.classList.remove('show-languages');
    }
});

footer.addEventListener('click', (ev)=>{
    if(composedPath(ev.target).includes(dropdown) || ev.target == countryList){
        countryList.classList.add('show-languages');
    }
    else{   
        countryList.classList.remove('show-languages');
    }
});

function composedPath(el) {
    var path = [];
    while (el) {
        path.push(el);
        if (el.tagName === 'HTML') {
            path.push(document);
            path.push(window);
            return path;
       }
       el = el.parentElement;
    }
}