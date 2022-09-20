"use strict";
const changeTextButton = document.querySelector(".changeText");
const input = document.querySelector(".userInput input");
const submitButton = document.querySelector(".btn");
const codigo = document.querySelector("#codigo");

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
  codigo.textContent = createCaptcha();
}

changeTextButton.addEventListener("click", refreshCaptcha);
window.addEventListener("load", refreshCaptcha);

submitButton.addEventListener("click", () => {
  let valor = input.value;
  let headerCaptcha = document.querySelector(".header-captcha");
  // console.log(`input:${valor} - captcha:${codigo.textContent} - son iguales? ${valor === codigo}`);
  headerCaptcha.classList.remove("fail");
  headerCaptcha.classList.remove("success");
  if (valor === codigo.textContent) {
    headerCaptcha.classList.add("success");
  } else if (valor !== "") {
    headerCaptcha.classList.add("fail");
  }
});
