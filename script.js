let changeTextButton = document.querySelector('.changeText');
const input = document.querySelector('.userInput input');
const submitButton = document.querySelector('.btn');
let codigo = document.querySelector('#codigo');

function createCaptcha(){
    let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '0','1','2','3','4','5','6','7','8','9'];

    let a = letters[Math.floor(Math.random() * letters.length)];
    let b = letters[Math.floor(Math.random() * letters.length)];
    let c = letters[Math.floor(Math.random() * letters.length)];
    let d = letters[Math.floor(Math.random() * letters.length)];
    let e = letters[Math.floor(Math.random() * letters.length)];
    let f = letters[Math.floor(Math.random() * letters.length)];

    codigo = a + b + c + d + e + f;
    return codigo
}


function refreshCaptcha(){
    codigo.textContent = createCaptcha();
}

changeTextButton.addEventListener('click' , ()=> {
    document.getElementById('codigo').innerHTML = createCaptcha() ;
});
window.addEventListener('load', refreshCaptcha);

submitButton.addEventListener('click', ()=>{
    let valor = document.getElementById('#userCaptcha').input
    if(valor == '') {
        alert('Ingresa el codigo de la imagen') ;
    }
    else if(valor === codigo.textContent) {
        alert('Valid input') ;
    }
    else {
        alert('Codigo incorrecto !') ;
    }
})
