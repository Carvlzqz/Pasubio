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

 

/* menu responsive*/
document.querySelector("#btn-hamburguesa").addEventListener("click",toggleMenu)

function toggleMenu() {
document.querySelector (".nav-bar").classList.toggle("ocultar")
}

/*tabla*/

 // Variables del Catalogo//
 const tablasCatalogo = document.querySelector('#tablasCatalogo');
 const datosCatalogo = [];
 const btnAgregarCatalogo = document.querySelector('#agregarCatalogo');
 const btnTripleCatalogo = document.querySelector('#tripleCatalogo');
 const btnVaciarCatalogo = document.querySelector('#vaciarCatalogo');

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
      agregarFilaCatalogo(dato);
    });
  }
}


function agregarFilaCatalogo(dato) {
  const fila = document.createElement('tr');

  const kilos = document.createElement('td');
  const nivelPrincipiante = document.createElement('td');
  const nivelIntermedio = document.createElement('td');
  const nivelAvanzado = document.createElement('td');

  kilos.innerText = dato.PesoKg + " kg"
  nivelPrincipiante.innerText= dato.nivelPrincipiante.min + " a " + dato.nivelPrincipiante.max + " litros";
  nivelIntermedio.innerText = dato.nivelIntermedio.min + " a " + dato.nivelIntermedio.max + " litros";
  nivelAvanzado.innerText = dato.nivelAvanzado.min + " a " + dato.nivelAvanzado.max + " litros";

  fila.appendChild(kilos);
  fila.appendChild(nivelPrincipiante);
  fila.appendChild(nivelIntermedio);
  fila.appendChild(nivelAvanzado);

  tablasCatalogo.appendChild(fila);
}


function nuevoItemCatalogo(copias = 1) {
  const nuevoItem = {
    "PesoKg": "",
    "nivelPrincipiante": {"min":0, "max":0},
    "nivelIntermedio": {"min":0, "max":0},
    "nivelAvanzado": {"min":0, "max":0}
  };
const inputKilos= document.querySelector('#kilos');
const inputnivelPrincipiante= document.querySelector('#nivelPrincipiante');
const inputnivelIntermedio= document.querySelector('#nivelIntermedio');
const inputnivelAvanzado= document.querySelector('#nivelAvanzado');

nuevoItem.PesoKg = inputKilos.value;
nuevoItem.nivelPrincipiante.min= inputnivelPrincipiante.value.split( "," )[0]
nuevoItem.nivelPrincipiante.max=inputnivelPrincipiante.value.split( "," )[1]
nuevoItem.nivelIntermedio.min=inputnivelIntermedio.value.split( "," )[0]
nuevoItem.nivelIntermedio.max=inputnivelIntermedio.value.split( "," )[1]
nuevoItem.nivelAvanzado.min=inputnivelAvanzado.value.split( "," )[0]
nuevoItem.nivelAvanzado.max=inputnivelAvanzado.value.split( "," )[1]

while (copias > 0) {
  datosCatalogo.push(nuevoItem);
  agregarFilaCatalogo(nuevoItem);
  copias--;
}
resetearFormCatalogo();
}
function resetearFormCatalogo() {
const form = document.querySelector('#formCatalogo');
form.reset();
}
if (tablasCatalogo) {
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
    tablasCatalogo.innerHTML = null;
  });
} 
  


