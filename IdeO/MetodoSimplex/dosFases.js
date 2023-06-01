let tabla = [
  [3, 1, 3, "="],
  [4, 3, 6, "≥"],
  [1, 2, 4, "≤"],
];
let matriz2 = asignarSigno(tabla);
matriz2 = agregarRes(matriz2);
console.table(matriz2);
function asignarSigno(tabla) {
  let A = 0;
  let a;
  let z = [];
  let res = [];
  tabla.map((e) => {
    if (e[e.length - 1] == "=") {
      let aux = e.slice(0, e.length - 2);
      aux = rellenar(A, aux);
      aux.push(1);
      z = rellenar(aux.length - 1 - z.length, z);
      z.push(-1);
      A++;
      res.push(aux);
    } else if (e[e.length - 1] == "≥") {
      let aux = e.slice(0, e.length - 2);
      aux = rellenar(A, aux);
      aux.push(-1);
      A++;
      aux.push(1);
      z = rellenar(aux.length - 1 - z.length, z);
      z.push(-1);
      A++;
      res.push(aux);
    } else if (e[e.length - 1] == "≤") {
      let aux = e.slice(0, e.length - 2);
      aux = rellenar(A, aux);
      aux.push(1);
      A++;
      res.push(aux);
    }
  });
  res.push(z);
  return res;
}

function agregarRes(tabla1) {
  let max1 = max(tabla1);
  tabla1.map((e, i) => {
    if (i < tabla.length) {
      while (e.length < max1) {
        tabla1[i].push(0);
      }
      tabla1[i].push(tabla[i][tabla[i].length - 2]);
    }
  });
  return tabla1;
}
function rellenar(num, arr) {
  for (let i = 0; i < num; i++) {
    arr.push(0);
  }
  return arr;
}
function max(tabla) {
  let max = 0;
  tabla.map((e) => {
    if (e.length > max) {
      max = e.length;
    }
  });
  return max;
}
