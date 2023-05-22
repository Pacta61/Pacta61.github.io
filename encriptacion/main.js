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
let icon2 = document.getElementById("btn-icon2");
let contentProc = document.getElementById("form-proc");
let cifradoBloques;
let tablaBinaria;

k.addEventListener("change", function () {
  textCifrado.value = "";
  textDecifrado.value = "";
  contentTable.innerHTML = "";
  tablaBinaria = crearTablaBinaria(k.value);
});

btnCifrar.addEventListener("click", () => {
  //Cifrar con metodo RSA
  icon2.className = "fa-solid fa-d";
  if (metodo.value == 3) {
    textCifrado.value = "";
    const [p, q] = dataPQ.value.split(",");
    contentProc.innerHTML = procRSA(p, q);
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
    contentProc.innerHTML = procMonoAlfa(textClaro.value);
    //Metodo por bloques
  } else if (metodo.value == 2) {
    if (typeof tablaBinaria != "object") alert("Indique el valor de K");
    textCifrado.value = metodoPorBloques(textClaro.value, k.value);
    contentProc.innerHTML = procBloques(textClaro.value, k.value);
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
  } else if (metodo.value == 3) {
    window.open("https://elcodigoascii.com.ar/", "ascii");
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

icon2.addEventListener("click", (e) => {
  e.preventDefault();
  if (icon2.classList == "fa-solid fa-d") {
    icon2.className = "fa-solid fa-b";
    if (textCifrado.value.length > 0) {
      let aux = textCifrado.value.split(",");
      cifradoBloques = aux;
      aux = aux.join("");
      aux = dividirString(aux, 8);
      aux = aux.map((e) => {
        return BinarioADecimal(e);
      });
      textCifrado.value = aux;
    }
  } else if (icon2.className == "fa-solid fa-b") {
    icon2.className = "fa-solid fa-d";
    textCifrado.value = cifradoBloques;
  }
});
function limpiarInputs() {
  if (metodo.value != 1) {
    icon.style.display = "inline-block";
  } else icon.style.display = "none";
  if (metodo.value == 2) {
    icon2.style.display = "inline-block";
  } else icon2.style.display = "none";
  contentTable.innerHTML = "";
  textClaro.value = "";
  textCifrado.value = "";
  textDecifrado.value = "";
  k.value = "";
  tablaBinaria = "";
  tabla = crearTabla();
  dataPQ.value = "";
  contentProc.innerHTML = "";
}

function procRSA(p, q) {
  let z = (p - 1) * (q - 1);
  let n = p * q;
  let e = calcularE(z);
  let d = calcularD(e, z);
  return `<h3> Metodo RSA</h3>
<h5>Paso 1: Obtener n = p * q y z = p-1 * q-1 </h5>
<p>n = ${p} * ${q} = ${p * q}</p>
<p>z = ${p}-1 * ${q}-1  = ${p - 1} * ${q - 1} = ${(p - 1) * (q - 1)}</p>
<h5>Paso 2: Encontrar primos relativos, calcular e donde 1 < e < n donde e = MCD(z,e) = 1</h5>
<p> MCD (${z},${e}) = 1</p>
<h5>Paso 3: Obtener el valor de d donde  (e * d) mod z = 1 O ((e * d)-1) mod z = 0</h5>
<p> (${e} * ${d}) mod ${z} =1 </p>
<h5>Paso 4: Determinar la clave Publica y privado</h5>
<p> clave publica: (n , e) = (${n},${e})</p>
<p> clave privada: (n , d) = (${n},${d})</p>
<h5>Aplicando las claves: </h5>
<p> Cifrando: c = m<sup>e</sup> mod n </p>
<p>c = m<sup>${e}</sup> mod ${n} </p>
<p> Descifrando: m = c<sup>d</sup> mod n </p>
<p> m = c<sup>${d}</sup> mod ${n} </p>

    `;
}
function procBloques(str, k) {
  k = parseInt(k);
  let binario = stringABinario(str);
  let binario2 = binario;
  while (binario2.length % k > 0) {
    binario2 = "0" + binario2;
  }
  console.log(typeof binario2);
  let strdividido = dividirString(binario2, k);
  console.log(strdividido);
  let encriptado = encriptarBloques(strdividido, tablaBinaria, "e");
  console.log(encriptado);
  return `<h3> Metodo por bloques simple</h3>
<h5>Paso 1: Convertimos el string a codigo ascii</h5>
<p>${str} = ${charToAscii(str)}</p>
<p>= ${binario2}</p>
<h5>Paso 2: Dividimos el resultado en bloques de tamaño k</h5>
<p>${dividirString(binario2, k)}</p>
<h5>Paso 3: Generamos al tabla aleatoriamente y encriptamos los bloques</h5>
<p>${encriptado}</p>
<h5>Desencriptando Usamos la tabla para desencriptar los bloques</h5>
<p>${strdividido}</p>
<h5>Desencriptando: Lo dividimos en bloques de 8 bits</h5>
<p>${dividirString(binario, 8)}</p>
<h5>Desencriptando: Lo convertimos a decimal </h5>
<p>${dividirString(binario, 8).map((e) => {
    return BinarioADecimal(e);
  })}</p>
<h5>Desencriptando: Lo convertimos a caracter utilizando el codigo ascii</h5>
<p>${str}</p>
    `;
}
function procMonoAlfa(str) {
  return `<h3> Metodo Mono alfabetico</h3>
  <h5>Paso 1: se genera la tabla aleatoriamente</h5>
  <h5>Paso 2: Se busca cada uno de los caracteres en la tabla y se sustituye por el caracter correspondiente encriptado</h5>
  <p>${str.toUpperCase()} = ${metodoMonoAlfabetico(tabla, str, "e").join(
    ""
  )}</p>
  <h5>Desencriptar: Se busca cada uno de los caracteres en la tabla y se sustituye por el caracter correspondiente desencriptado</h5>
  <p> ${metodoMonoAlfabetico(tabla, str, "e").join(
    ""
  )} = ${str.toUpperCase()} </p>
  `;
}
