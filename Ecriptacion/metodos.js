//Metodo de cifrado por bloques simple

function metodoPorBloques(str, k) {
  str = stringABinario(str);
  k = parseInt(k);
  while (str.length % k > 0) {
    str = "0" + str;
  }
  str = dividirString(str, k);
  return encriptarBloques(str, tablaBinaria, "e");
}

function desencriptarBloques(str) {
  let aux = str.join("");
  while (aux.length % 8 > 0) {
    aux = aux.slice(1);
  }
  aux = dividirString(aux, 8);
  aux = aux.map((e) => {
    return BinarioADecimal(e);
  });
  aux = asciiToChar(aux);
  return aux.join("");
}
function asciiToChar(nums) {
  return nums.map((e) => {
    return String.fromCharCode(e);
  });
}
function charToAscii(str) {
  return str.split("").map((e) => {
    return e.charCodeAt(0);
  });
}
function encriptarBloques(bloques, tabla, opc) {
  let res = [];
  if (opc == "e") {
    bloques.map((e) => {
      res.push(tabla[1][tabla[0].indexOf(e)]);
    });
  } else if (opc == "d") {
    bloques.map((e) => {
      res.push(tabla[0][tabla[1].indexOf(e)]);
    });
  }

  return res;
}

function crearTablaBinaria(k) {
  let num = Math.pow(2, k);
  let res = [[], []];
  for (let i = 0; i < num / 2; i++) {
    res[0].push(i);
    res[1].push(i + num / 2);
  }
  shuffle(res[1]);
  for (let i = num / 2; i < num; i++) {
    res[0].push(i);
    res[1].push(res[0][res[1].indexOf(i)]);
  }
  res[0] = res[0].map((e) => {
    return decimalABinario(e, k);
  });
  res[1] = res[1].map((e) => {
    return decimalABinario(e, k);
  });
  return res;
}

function dividirString(str, k) {
  let res = [];
  for (let i = 0; i < str.length; i += k) {
    res.push(str.substring(i, i + k));
  }
  return res;
}
function stringABinario(str) {
  return str
    .split("")
    .map((e) => {
      return decimalABinario(e.charCodeAt(0), 8);
    })
    .join("");
}
function BinarioADecimal(num) {
  let sum = 0;

  for (let i = 0; i < num.length; i++) {
    sum += +num[i] * 2 ** (num.length - 1 - i);
  }
  return sum;
}
function decimalABinario(number, k) {
  let binary = number.toString(2);
  while (binary.length < k) {
    binary = "0" + binary;
  }
  return binary;
}

//Metodo monoalfabetico
let tabla = crearTabla();
function metodoMonoAlfabetico(table, str, opc) {
  str = str.toUpperCase();
  if (opc == "e") {
    str = str.split("").map((e) => {
      let aux = table[0].indexOf(e);
      return aux == -1 ? e : table[1][aux];
    });
  } else if (opc == "d") {
    str = str.split("").map((e) => {
      let aux = table[1].indexOf(e);
      return aux == -1 ? e : table[0][aux];
    });
  }

  return str;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function crearTabla() {
  let alfa = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let tabla = [];
  tabla.push(alfa.split(""));
  alfa = alfa.split("");
  shuffle(alfa);
  tabla.push(alfa);
  return tabla;
}
//Metodo RSA
function metodoRSA(p, q, num, type) {
  const pow = (base, exponent) => base ** exponent;
  let n = p * q;
  let z = (p - 1) * (q - 1);
  let e = calcularE(z);
  let d = BigInt(calcularD(e, z));
  e = BigInt(e);
  n = BigInt(n);
  num = BigInt(num);
  if (type == "e") {
    return pow(num, e) % n;
  } else if (type == "d") {
    return pow(num, d) % n;
  }
}

function calcularD(e, z) {
  for (let i = 2; i < z; i++) {
    if ((e * i) % z == 1) {
      return i;
    }
  }
}

function calcularE(z) {
  for (let i = 2; i < z; i++) {
    if (MCD(z, i) == 1) {
      return i;
    }
  }
}

function MCD(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function mostrarTabla(tabla) {
  return `<table>
            <tr>
              <td class="th" >Claro  </td>
              ${tabla[0].map((e) => {
                return `<td>${e}</td>`;
              })}
            </tr>
            <tr>
              <td class="th">Cifrado  </td>
              ${tabla[1].map((e) => {
                return `<td>${e}</td>`;
              })}
            </tr>
          </table>
  `;
}
