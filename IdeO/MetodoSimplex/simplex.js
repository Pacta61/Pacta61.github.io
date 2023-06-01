let contentRes = document.querySelector(".content-res");

let valores = [
  [125, 200, 5000],
  [150, 100, 3000],
  [67, 25, 1000],
];
let z = [40, 50];

function metodoSimplex(valores, z) {
  // primera tabla
  z = z.map((e) => {
    return e - e * 2;
  });
  let variables = valores.map((e, i) => {
    return e.slice(0, e.length - 1);
  });
  variables = agregarVariables(variables);
  variables.push(z);
  variables = rellenarVacios(variables);
  variables.map((e, i) => {
    if (i < variables.length - 1) {
      e.push(valores[i][valores[i].length - 1]);
    }
  });
  variables = rellenarVacios(variables);
  let primerTabla = variables;
  mostrarTabla(variables);
  //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  let pivote = pivotear(variables);
  //dividimos el renglon pivote
  variables[pivote[1]] = variables[pivote[1]].map((e) => {
    return e / pivote[0];
  });
  //igualamos a cero la columna del renglo pivote
  variables = variables.map((e, i) => {
    if (i != pivote[1]) {
      let aux = e[pivote[2]];
      e = e.map((ele, i) => {
        return (ele -= variables[pivote[1]][i] * aux);
      });
    }
    return e;
  });
  let segundaTabla = variables;
  mostrarTabla(variables);
  pivote = pivotear(variables);
  variables[pivote[1]] = variables[pivote[1]].map((e) => {
    return e / pivote[0];
  });
  //igualamos a cero la columna del renglo pivote
  variables = variables.map((e, i) => {
    if (i != pivote[1]) {
      let aux = e[pivote[2]];
      e = e.map((ele, i) => {
        return (ele -= variables[pivote[1]][i] * aux);
      });
    }
    return e;
  });
  mostrarTabla(variables);
  //console.log(pivote);
  return variables;
}

//console.table(metodoSimplex(valores, z));

function pivotear(arr) {
  let menorZ = arr[arr.length - 1];
  menorZ = Math.min(...menorZ);
  let menorZIndex = arr[arr.length - 1].indexOf(menorZ);
  let vals = arr.map((e, i) => {
    if (i < arr.length - 1) {
      return e[e.length - 1] / e[menorZIndex];
    } else return null;
  });
  vals = vals.filter((el) => el !== null);
  let menorx = vals.indexOf(Math.min(...vals));
  return [arr[menorx][menorZIndex], menorx, menorZIndex];
}

function rellenarVacios(arr) {
  let maxi = max(arr);
  return arr.map((e) => {
    while (e.length < maxi) {
      e.push(0);
    }
    return e;
  });
}

function agregarVariables(arr) {
  return arr.map((e, i) => {
    let aux = rellenar(i, e);
    aux.push(1);
    return aux;
  });
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

function calcularHeadTabla() {
  let variables2 = "";
  let s = "";
  for (let i = 1; i <= numVariables.value; i++) {
    variables2 += `<th>X<sub>${i}</sub></th>`;
  }
  for (let i = 1; i <= matriz.length; i++) {
    s += `<th>S<sub>${i}</sub></th>`;
  }
  console.log(variables2);
  return `<tr>${variables2 + s}<th>CTE</th></tr>`;
}

function mostrarTabla(arr) {
  contentRes.innerHTML += `<table id="res-tabla">${calcularHeadTabla()}${arr.map(
    (e) => {
      return `<tr>${e.map((el) => {
        return `<td>${el}</td>`;
      })}</tr>`;
    }
  )}</table>`;
}
