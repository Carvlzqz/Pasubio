"use strict";

function obtenerValoresAleatorios(listaValores) {
  return listaValores[Math.floor(Math.random() * listaValores.length)];
}

function createCaptcha() {
  let letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    let letraNueva = obtenerValoresAleatorios(letters);
    captcha = captcha + letraNueva;
  }
  return captcha;
}

function refreshCaptcha() {
  const codigo = document.querySelector("#codigo");
  if (codigo)
    codigo.textContent = createCaptcha();
}
window.addEventListener("load", refreshCaptcha);

function refreshCaptchaEvento() {
  const refreshCaptchaBoton = document.querySelector("#refreshCaptcha");
  if (refreshCaptchaBoton) {
    refreshCaptchaBoton.addEventListener("click", refreshCaptcha);
  }
}
refreshCaptchaEvento();

function submitCaptchaEvento() {
  const submitCaptchaBoton = document.querySelector("#submitCaptcha");
  if (submitCaptchaBoton) {
    submitCaptchaBoton.addEventListener("click", () => {
      const input = document.querySelector(".userInput input");
      const codigo = document.querySelector("#codigo");
      let valor = input.value;
      let headerCaptcha = document.querySelector(".header-captcha");

      headerCaptcha.classList.remove("fail");
      headerCaptcha.classList.remove("success");
      if (valor === codigo.textContent) {
        headerCaptcha.classList.add("success");
      } else if (valor !== "") {
        headerCaptcha.classList.add("fail");
      }
    });
  }
}
submitCaptchaEvento();

function submitLogin() {
  const loginForm = document.querySelector("#login");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}
submitLogin();

 // Variables del Catalogo
 const bodyCatalogo = document.querySelector('#contenidoCatalogo');
 const datosCatalogo = [];
 const btnAgregarCatalogo = document.querySelector('#agregarCatalogo');
 const btnTripleCatalogo = document.querySelector('#tripleCatalogo');
 const btnVaciarCatalogo = document.querySelector('#vaciarCatalogo');
 //

/* menu responsive*/
document.querySelector("#btn-hamburguesa").addEventListener("click",toggleMenu)

function toggleMenu() {
document.querySelector (".nav-bar").classList.toggle("ocultar")
}

/*tabla*/
function toggleBotonRegistro(deshabilitado) {
  btnRegistrar.disabled = deshabilitado;
}

async function cargarCatalogo() {
  await precargarCatalogo();
  llenarCatalogo(datosCatalogo);
}

async function precargarCatalogo() {
  return await fetch('./datosTabla.json')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      pegarCatalogo(data);
    });
}

function pegarCatalogo(arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach((elemento) => {
      datosCatalogo.push(elemento);
    });
  }
}

function llenarCatalogo(datos) {
  if (Array.isArray(datos) && datos.length > 0) {
    datos.forEach((dato) => {
      agregarFilaCatalogo(dato, crearListaApi);
    });
  }
}

function agregarFilaCatalogo(dato, callbackCrearLista) {
  const fila = document.createElement('tr');

  const kilos = document.createElement('td');
  const nivelPrincipiante = document.createElement('td');
  const nivelIntermedio = document.createElement('td');
  const nivelAvanzado = document.createElement('td');

  kilos.innerText = dato.kilos;
  nivelIntermedio.innerText = dato.nivelIntermedio;
  nivelAvanzado.innerText = dato.nivelAvanzado;

  fila.appendChild(kilos);
  fila.appendChild(nivelPrincipiante);
  fila.appendChild(nivelIntermedio);
  fila.appendChild(nivelAvanzado);

  bodyCatalogo.appendChild(fila);
}

function crearListaInput(arr) {
  const lista = document.createElement('ul');

  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach((elemento) => {
      const elementoLista = document.createElement('li');
      elementoLista.innerText = elemento;
      lista.appendChild(elementoLista);
    });

    return lista;
  }
}

function nuevoItemCatalogo(copias = 1) {
  const nuevoItem = {
    kilos: '',
    nivelPrincipiante:0,
    nivelIntermedio: 0,
    nivelAvanzado: 0,
  };
const inputKilos= document.querySelector('#kilos');
const inputnivelPrincipiante= document.querySelector('#nivelPrincipiante');
const inputnivelIntermedio= document.querySelector('#nivelIntermedio');
const inputnivelAvanzado= document.querySelector('#nivelAvanzado');

nuevoItem.kilos = inputKilos.value;
nuevoItem.nivelPrincipiante = inputnivelPrincipiante.value.split(',');
nuevoItem.nivelIntermedio = parseFloat(inputnivelIntermedio.value);
nuevoItem.nivelAvanzado = parseFloat(inputnivelAvanzado.value);
}

while (copias > 0) {
  datosCatalogo.push(nuevoItem);
  agregarFilaCatalogo(nuevoItem, crearListaInput);
  copias--;
}
resetearFormCatalogo();

function resetearFormCatalogo() {
const form = document.querySelector('#formCatalogo');
form.reset();
}
if (bodyCatalogo) {
  cargarCatalogo();

  btnAgregarCatalogo.addEventListener('click', (e) => {
    e.preventDefault();
    nuevoItemCatalogo();
  });

  btnTripleCatalogo.addEventListener('click', (e) => {
    e.preventDefault();
    nuevoItemCatalogo(3);
  });

  btnVaciarCatalogo.addEventListener('click', () => {
    datosCatalogo.length = 0;
    bodyCatalogo.innerHTML = null;
  });
} 
  


