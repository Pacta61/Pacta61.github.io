let metodo = document.getElementById("form-select");
let btnCifrar = document.getElementById("btn-cifrar");
let btnDecifrar = document.getElementById("btn-decifrar");
let textClaro = document.getElementById("form-textoClaro");
let textCifrado = document.getElementById("form-textoCifrado");
let textDecifrado = document.getElementById("form-textoDecifrado");
let dataPQ = document.getElementById("form-patron");
let k = document.getElementById("form-k");
let tablaBinaria;

k.addEventListener("change", function () {
  textCifrado.value = "";
  textDecifrado.value = "";
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
  } else if (metodo.value == 2) {
    if (typeof tablaBinaria != "object") alert("Indique el valor de K");
    textCifrado.value = metodoPorBloques(textClaro.value, k.value);
  }
});

btnDecifrar.addEventListener("click", () => {
  //Decifrar con metodo RSA
  if (metodo.value == 3) {
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
  } else if (metodo.value == 2) {
    textDecifrado.value = desencriptarBloques(textCifrado.value.split(","));
  }
});

function limpiarInputs() {
  textClaro.value = "";
  textCifrado.value = "";
  textDecifrado.value = "";
  k.value = "";
  tablaBinaria = "";
  tabla = crearTabla();
}
