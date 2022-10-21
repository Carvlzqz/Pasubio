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