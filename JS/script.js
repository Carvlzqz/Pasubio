"use strict";
const API_URL = "https://6379318b7419b414df8bbbaa.mockapi.io/categoriaTablas/"
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
 let datosCatalogo = [];
 const btnAgregarCatalogo = document.querySelector('#agregarCatalogo');
 const btnTripleCatalogo = document.querySelector('#tripleCatalogo');
 const btnVaciarCatalogo = document.querySelector('#vaciarCatalogo');

function toggleBotonRegistro(deshabilitado) {
  btnRegistrar.disabled = deshabilitado;
}

async function cargarCatalogo() {
  tablasCatalogo.innerHTML = "";
  datosCatalogo = [];
  await precargarCatalogo();
  llenarCatalogo(datosCatalogo);
}

async function precargarCatalogo() {
  return await fetch(API_URL)
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
  const botones = document.createElement('td');

  kilos.innerText = dato.PesoKg + " kg"
  nivelPrincipiante.innerText= dato.nivelPrincipiante.min + " a " + dato.nivelPrincipiante.max + " litros";
  nivelIntermedio.innerText = dato.nivelIntermedio.min + " a " + dato.nivelIntermedio.max + " litros";
  nivelAvanzado.innerText = dato.nivelAvanzado.min + " a " + dato.nivelAvanzado.max + " litros";
  botones.appendChild(crearBtnEditarFila(dato.id))
  botones.appendChild(crearBtnEliminarFila(dato.id))

  fila.appendChild(kilos);
  fila.appendChild(nivelPrincipiante);
  fila.appendChild(nivelIntermedio);
  fila.appendChild(nivelAvanzado);
  fila.appendChild(botones)

  tablasCatalogo.appendChild(fila);
}

function crearBtnEditarFila(id){
  const btn = document.createElement('button');
  btn.dataset.id = id;
  btn.addEventListener("click", cargarFormularioParaEditar)
  btn.innerText = "Editar";
  return btn
}

async function cargarFormularioParaEditar(event){
  const btn = event.target
  const data = await buscarPorId(btn.dataset.id)
  console.log(data)

  const inputIdCategoriaTabla = document.querySelector("input#idCategoriaTabla")
  const inputKilos = document.querySelector('#kilos');
  const inputnivelPrincipiante = document.querySelector('#nivelPrincipiante');
  const inputnivelIntermedio = document.querySelector('#nivelIntermedio');
  const inputnivelAvanzado = document.querySelector('#nivelAvanzado');

  inputIdCategoriaTabla.value = data.id
  inputKilos.value = data.PesoKg
  inputnivelPrincipiante.value = data.nivelPrincipiante.min + "," + data.nivelPrincipiante.max
  inputnivelIntermedio.value = data.nivelIntermedio.min + "," + data.nivelIntermedio.max
  inputnivelAvanzado.value = data.nivelAvanzado.min + "," + data.nivelAvanzado.max

}

async function buscarPorId(id){
  return await fetch(API_URL+id).then(res => res.json())
}

function crearBtnEliminarFila(id){
  const btn = document.createElement('button');
  btn.dataset.id = id;
  btn.innerText = "Eliminar";
  btn.addEventListener("click", eliminarCategoriaTabla)
  return btn
}

async function eliminarCategoriaTabla(event){
  const btn = event.target
  const idCategoria = btn.dataset.id
  if (idCategoria)
    await fetch(API_URL+idCategoria, { method: 'DELETE' }).then(cargarCatalogo)
}

async function editarCategoriaTabla(idCategoria){
  try{
    const categoriaTabla = getCategoriaTablaFormData()
    await editarCategoriaTablaApi(idCategoria, categoriaTabla)
    cargarCatalogo();
    resetearFormCatalogo();
  }
  catch (err){
    console.error(err)
  }
}

async function editarCategoriaTablaApi(id, categoriaTabla) {
  const configuracion = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaTabla),
  };
  console.log(configuracion.body);
  return await fetch(API_URL+id, configuracion).then(cargarCatalogo);
}


function getCategoriaTablaFormData(){
  
  const categoriaTabla = {
    "PesoKg": "",
    "nivelPrincipiante": {"min":0, "max":0},
    "nivelIntermedio": {"min":0, "max":0},
    "nivelAvanzado": {"min":0, "max":0}
  };
  const inputKilos= document.querySelector('#kilos');
  const inputnivelPrincipiante= document.querySelector('#nivelPrincipiante');
  const inputnivelIntermedio= document.querySelector('#nivelIntermedio');
  const inputnivelAvanzado= document.querySelector('#nivelAvanzado');

  categoriaTabla.PesoKg = inputKilos.value;
  categoriaTabla.nivelPrincipiante.min= inputnivelPrincipiante.value.split( "," )[0]
  categoriaTabla.nivelPrincipiante.max=inputnivelPrincipiante.value.split( "," )[1]
  categoriaTabla.nivelIntermedio.min=inputnivelIntermedio.value.split( "," )[0]
  categoriaTabla.nivelIntermedio.max=inputnivelIntermedio.value.split( "," )[1]
  categoriaTabla.nivelAvanzado.min=inputnivelAvanzado.value.split( "," )[0]
  categoriaTabla.nivelAvanzado.max=inputnivelAvanzado.value.split( "," )[1]

  return categoriaTabla
}

async function nuevoItemCatalogo(copias = 1) {
  const nuevoItem = getCategoriaTablaFormData();

  try {
    while (copias > 0) {
      await agregarCategoriaTablaApi(nuevoItem)
      copias--;
    }
    cargarCatalogo();
    resetearFormCatalogo();
  } catch (err) {
    console.log(err);
  }
}

async function agregarCategoriaTablaApi(categoriaTabla) {
  const configuracion = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaTabla),
  };
  console.log(configuracion.body)
  return await fetch(API_URL, configuracion);
}

function resetearFormCatalogo() {
  const form = document.querySelector('#formCatalogo');
  form.reset();
}

if (tablasCatalogo) {
  cargarCatalogo();

  btnAgregarCatalogo.addEventListener('click', (e) => {
    e.preventDefault();
    const idCategoria = document.querySelector("input#idCategoriaTabla")?.value
    if (idCategoria)
      editarCategoriaTabla(idCategoria);
    else
      nuevoItemCatalogo();
  });

  btnTripleCatalogo.addEventListener('click', (e) => {
    e.preventDefault();
    if (!document.querySelector("input#idCategoriaTabla")?.value)
      nuevoItemCatalogo(3);
  });

  btnVaciarCatalogo.addEventListener('click', () => {
    datosCatalogo.length = 0;
    tablasCatalogo.innerHTML = null;
  });
} 
  


