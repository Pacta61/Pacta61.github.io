let valores = [
  [125, 200, 5000],
  [150, 100, 3000],
  [67, 25, 1000],
];
let z = [40, 50];
function metodoSimplex(val, z) {
  //Primera  SBF (Ordenamiento de los datos)
  let valores = val;
  var z = z.map(function (x) {
    return x * -1;
  });
  for (let i = 0; i < 4; i++) {
    z.push(0);
  }
  valores.map((ele, x) => {
    let cte = ele.pop();
    for (let i = 0; i < 3; i++) {
      ele.push(0);
    }
    ele[x + 2] = 1;
    ele.push(cte);
  });
  valores.push(z);
  //Segunda SBF
  //pivoteando
  let min;
  min = valores.map((ele) => {
    let x = pivotear(valores[3]);
    return ele[5] / ele[x];
  });
  min.pop();
  min = min.indexOf(Math.min(...min));
  console.log(min, "min");
  var indexPivote = pivotear(valores[3]);
  console.log(indexPivote, "pivote");
  var pivote = valores[min][pivotear(valores[3])];
  console.log(pivote, "valor del pivote");
  //********************************************************

  valores[min] = valores[min].map((ele) => {
    return ele / pivote;
  });
  console.table(valores);
  for (let x = 1; x < valores.length; x++) {
    let valor1 = valores[x][indexPivote];
    for (let j = 0; j < 6; j++) {
      valores[x][j] -= valor1 * valores[min][j];
    }
  }
  //Tercera SBF
  //pivoteando
  min;
  min = valores.map((ele) => {
    let x = pivotear(valores[3]);
    return ele[5] / ele[x];
  });
  min.pop();
  min = min.indexOf(Math.min(...min));
  console.log(min, "min");
  var indexPivote = pivotear(valores[3]);
  console.log(indexPivote, "pivote");
  var pivote = valores[min][pivotear(valores[3])];
  console.log(pivote, "valor del pivote");
  //***************************************************
  valores[min] = valores[min].map((ele) => {
    return ele / pivote;
  });
  for (let x = 0; x < valores.length; x++) {
    if (x != min) {
      let valor1 = valores[x][indexPivote];
      for (let j = 0; j < 6; j++) {
        valores[x][j] -= valor1 * valores[min][j];
      }
    }
  }
  return valores;
}

function pivotear(rp) {
  let colum = rp.indexOf(Math.min(...rp));
  return colum;
}

console.table(metodoSimplex(valores, z));
