let metodo = document.getElementById("form-select");
let btnCifrar = document.getElementById("btn-cifrar");
let btnDecifrar = document.getElementById("btn-decifrar");
let textClaro = document.getElementById("form-textoClaro");
let textCifrado = document.getElementById("form-textoCifrado");
let textDecifrado = document.getElementById("form-textoDecifrado");
let dataPQ = document.getElementById("form-patron");
let k = document.getElementById("form-k");
let btnTabla = document.getElementById("btn-verTabla");
let contentTable = document.getElementById("tabla");
let btnText = document.querySelector(".btn-icon");
let icon = document.getElementById("btn-icon");
let tablaBinaria;

k.addEventListener("change", function () {
  textCifrado.value = "";
  textDecifrado.value = "";
  contentTable.innerHTML = "";
  tablaBinaria = crearTablaBinaria(k.value);
});

btnCifrar.addEventListener("click", () => {
  //Cifrar con metodo RSA
  if (metodo.value == 3) {
    textCifrado.value = "";
    const [p, q] = dataPQ.value.split(",");
    let textClaro2 = textClaro.value.split("");
    let aux = [];
    textClaro2.map((e) => {
      aux.push(metodoRSA(p, q, e.charCodeAt(0), "e"));
    });
    textCifrado.value = aux.join(",");
    //Metodo Monoalfabetico
  } else if (metodo.value == 1) {
    textCifrado.value = metodoMonoAlfabetico(tabla, textClaro.value, "e").join(
      ""
    );
    //Metodo por bloques
  } else if (metodo.value == 2) {
    if (typeof tablaBinaria != "object") alert("Indique el valor de K");
    textCifrado.value = metodoPorBloques(textClaro.value, k.value);
  }
});

btnDecifrar.addEventListener("click", () => {
  //Decifrar con metodo RSA

  if (metodo.value == 3) {
    icon.className = "fa-solid fa-a";
    const [p, q] = dataPQ.value.split(",");
    let textCifrado2 = textCifrado.value.split(",");
    let aux = [];
    textCifrado2.map((e) => {
      aux.push(metodoRSA(p, q, e, "d"));
    });
    textDecifrado.value = aux.join(",");
    //Metodo Monoalfabetico
  } else if (metodo.value == 1) {
    let text = textCifrado.value.split("");
    text = text.join("");
    textDecifrado.value = metodoMonoAlfabetico(tabla, text, "d").join("");
    //Metodos por bloques
  } else if (metodo.value == 2) {
    icon.className = "fa-solid fa-a";
    textDecifrado.value = encriptarBloques(
      textCifrado.value.split(","),
      tablaBinaria,
      "d"
    );
  }
});

btnTabla.addEventListener("click", () => {
  if (metodo.value == 1) {
    contentTable.innerHTML = mostrarTabla(tabla);
  } else if (metodo.value == 2) {
    contentTable.innerHTML = mostrarTabla(tablaBinaria);
  }
});

icon.addEventListener("click", (e) => {
  e.preventDefault();
  let aux = textDecifrado.value.split(",");
  if (metodo.value == 3) {
    console.log(icon.className);
    if (icon.classList == "fa-solid fa-a") {
      icon.className = "fa-solid fa-1";
      textDecifrado.value = asciiToChar(aux).join("");
    } else if (icon.className == "fa-solid fa-1") {
      textDecifrado.value = charToAscii(textDecifrado.value);
      icon.className = "fa-solid fa-a";
    }
  } else if (metodo.value == 2) {
    if (icon.classList == "fa-solid fa-1") {
      icon.className = "fa-solid fa-a";
      textDecifrado.value = encriptarBloques(
        textCifrado.value.split(","),
        tablaBinaria,
        "d"
      );
    } else if (icon.className == "fa-solid fa-a") {
      textDecifrado.value = desencriptarBloques(aux);
      icon.className = "fa-solid fa-1";
    }
  }
});
function limpiarInputs() {
  if (metodo.value != 1) {
    icon.style.display = "inline-block";
  } else icon.style.display = "none";
  contentTable.innerHTML = "";
  textClaro.value = "";
  textCifrado.value = "";
  textDecifrado.value = "";
  k.value = "";
  tablaBinaria = "";
  tabla = crearTabla();
  dataPQ.value = "";
}
