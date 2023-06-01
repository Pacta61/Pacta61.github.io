const z_x1 = document.getElementById("z-x1");
const z_x2 = document.getElementById("z-x2");
const x1 = document.querySelector("#x1");
const x2 = document.querySelector("#x2");
const op = document.querySelector("#op");
const res = document.querySelector("#res");

//Crear grafica
const b = JXG.JSXGraph.initBoard("jxgbox", {
  boundingbox: [-1, 10, 10, -1, "#E6F2FF"],
  axis: true,
  showCopyright: false,
  grid: false,
});
//Genera la grafica e intersecciones
function crearGrafica() {
  mostrarSistema();
  let valores = calcularRectas();
  let max = obtenerMaxNum(valores);
  const b = JXG.JSXGraph.initBoard("jxgbox", {
    boundingbox: [
      (max / 10) * -1,
      max + max / 10,
      max + max / 10,
      (max / 10) * -1,
    ],
    axis: true,
    showCopyright: false,
    grid: false,
    drag: {
      enabled: false,
    },
  });
  b.defaultAxes.x.ticks = b.defaultAxes.y.ticks = 10;

  let rectas = [];
  let points = [];
  let isEqual = false;
  let poligonos = [];
  let poligonos2p = [];
  let cord00 = b.create("point", [0, 0], { size: 2, Color: "#9a080b" });
  let cord99 = b.create("point", [90000, 90000], {
    name: "Z",
    size: 2,
    Color: "#9a080b",
  });
  let cord09 = b.create("point", [0, 90000], {
    name: "x",
    size: 2,
    Color: "#9a080b",
  });
  let cord90 = b.create("point", [90000, 0], {
    name: "y",
    size: 2,
    Color: "#9a080b",
  });
  points.push(cord00);
  valores.forEach((element) => {
    let p2 = b.create("point", [0, element[1]], { size: 2, Color: "#9a080b" });
    let p1 = b.create("point", [element[0], 0], { size: 2, Color: "#9a080b" });
    if (element[3] == "≤") {
      poligonos.push(
        b.create("polygon", [p1, cord00, p2], { fillColor: "green" })
      );
    } else if (element[3] == "≥") {
      poligonos.push(
        b.create("polygon", [p1, cord90, cord99, cord09, p2], {
          fillColor: "green",
        })
      );
    } else if (element[3] == "=") {
      isEqual = true;
      poligonos2p.push(
        b.create("polygon", [p1, p2], {
          fillColor: "green",
          borders: {
            color: "green",
            opacity: 0.2,
            strokeWidth: 8,
          },
        })
      );
    }
    rectas.push(
      b.create("line", [p1, p2], {
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        strokeColor: colores[element[2]],
      })
    );
    points.push(p2);
    points.push(p1);
  });
  //calcula la region Factible
  if (rectas.length > 1 && poligonos.length > 1) {
    var zonaFactible = b.create(
      "polygon",
      poligonos[0].intersect(poligonos[1]),
      {
        fillColor: "green",
        size: 2,
      }
    );
  }
  //crea intersecciones entre los poligonos
  if (isEqual && poligonos2p.length > 1) {
    zonaFactible = b.create(
      "polygon",
      poligonos2p[0].intersect(poligonos2p[1]),
      {
        fillColor: "green",
        size: 2,
      }
    );
  }
  if (rectas.length > 2) {
    for (let i = 2; i < poligonos.length; i++) {
      let aux = zonaFactible.intersect(poligonos[i]);

      let puntosPoly = zonaFactible.childElements;
      let puntosPolyKeys = Object.keys(puntosPoly);
      puntosPolyKeys.forEach((element) => {
        puntosPoly[element].setAttribute({ size: 2, color: "#9a080b" });
      });
      zonaFactible.remove();
      zonaFactible = b.create("polygon", aux, {
        fillColor: "green",
        size: 2,
      });
    }
  }
  //crea las interseccines con la funciones =
  if (isEqual && poligonos.length > 1) {
    for (let i = 0; i < poligonos2p.length; i++) {
      let aux2 = zonaFactible.intersect(poligonos2p[i]);
      let puntosPoly = zonaFactible.childElements;
      let puntosPolyKeys = Object.keys(puntosPoly);
      puntosPolyKeys.forEach((element) => {
        puntosPoly[element].setAttribute({ size: 2, color: "#9a080b" });
      });
      zonaFactible.remove();
      zonaFactible = b.create("polygon", aux2, {
        fillColor: "green",
        size: 2,
        borders: {
          color: "green",
          opacity: 0.2,
          strokeWidth: 8,
        },
      });
    }
  }
  //elimina Poligonos
  if (rectas.length > 1) {
    b.suspendUpdate();
    poligonos.forEach((element) => {
      b.removeObject(element, true);
    });
    poligonos2p.forEach((element) => {
      b.removeObject(element, true);
    });
    b.unsuspendUpdate();
    b.update();
    puntosPoly = zonaFactible.childElements;
    puntosPolyKeys = Object.keys(puntosPoly);
    puntosPolyKeys.forEach((element) => {
      puntosPoly[element].setAttribute({ size: 2, color: "#9a080b" });
    });
  }
  //calcula intersecciones
  let intersecciones = [];
  for (let i = 0; i < rectas.length; i++) {
    for (let j = i + 1; j < rectas.length; j++) {
      points.push(
        b.create("intersection", [rectas[i], rectas[j], 0], {
          size: 2,
          Color: "#9a080b",
        })
      );
    }
  }
  points = points.filter(
    (p) => p.coords.usrCoords[1] >= 0 && p.coords.usrCoords[2] >= 0
  );
  crearTabla(points);
}

var colores = [
  "#ffd22c",
  "#121d7a",
  "#82005f",
  "#37231b",
  "#a20c31",
  "#ff8369",
  "#2099d8",
  "#82b800",
  "#fa6d5e",
  "#1b1507",
  "#ff0096",
  "#7ef25c",
  "#252525",
];
var estado = 0;
var functions = [];
var x = 0;
const btn = document.getElementById("funcion-btn");
//Agregar funcion
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validarInputs()) {
    const content = document.querySelector(".content-funciones");
    const element = document.createElement("crear-funcion");
    const input = document.getElementById("funcion-input");
    element.setAttribute(
      "funcion",
      `${x1.value}X<sub>1</sub> + ${x2.value}X<sub>2</sub> ${op.value} ${res.value}`
    );
    element.setAttribute("num", x);
    element.setAttribute("color", colores[x]);
    content.appendChild(element);
    functions.push([x1.value, x2.value, res.value, x, op.value]);
    document.querySelector("#x1").value = "";
    document.querySelector("#x2").value = "";
    document.querySelector("#res").value = "";
    x++;
  } else alert("Debe rellenar todos los campos");
});
const content = document.querySelector(".content-funciones");

//Remover funciones
content.addEventListener(
  "click",
  (e) => {
    const element = document.getElementById(e.target.id + "a");
    //ELiminar
    if (e.target.className == "fa-solid fa-trash borrar") {
      element.remove();
      functions.map((element, pos) => {
        if (element[3] == e.target.id) {
          functions[pos] = null;
        }
      });
      //Editar
    } else if (e.target.className == "fa-solid fa-pen-to-square") {
      element.remove();
      functions.map((element, pos) => {
        if (element[3] == e.target.id) {
          document.querySelector("#x1").value = element[0];
          document.querySelector("#x2").value = element[1];
          document.querySelector("#res").value = element[2];
          document.getElementById("op").value = element[4];
          functions[pos] = null;
        }
      });
    }
    functions = functions.filter((el) => el !== null);
  },
  0
);

//optiene los valores de las grafias con el valor del input
const convertirFuncion = (fun, x) => {
  let res, aux;
  estado == 0 ? (res = fun.split("<")) : (res = fun.split(">"));
  aux = res[0].split("+").map((elem) => {
    return elem.substr(0, elem.length - 1);
  });
  aux.push(res[1], x);
  return aux;
};

//calcula los valores para graficar
const calcularRectas = () => {
  let resul = [];
  functions.forEach((elem) => {
    resul.push([elem[2] / elem[0], elem[2] / elem[1], elem[3], elem[4]]);
  });
  return resul;
};

const tipoMin = document.getElementById("tipo1");
const tipoMax = document.getElementById("tipo2");

function removeAllChilds(a) {
  while (a.hasChildNodes()) a.removeChild(a.firstChild);
}
const obtenerMaxNum = (a) => {
  let max = 0,
    aux;
  a.forEach((elem) => {
    aux = Math.max(elem[0], elem[1]);
    max = aux > max ? aux : max;
  });
  return max;
};
const obtenerMinNum = (a) => {
  let min = 1000,
    aux;
  a.forEach((elem) => {
    aux = Math.min(elem[0], elem[1]);
    min = aux < min ? aux : min;
  });
  return min;
};

const crearTabla = (point) => {
  const tabla = document.querySelector(".tabla");
  tabla.innerHTML = ` 
  <thead>
  <tr>
  <th>Punto</th>
  <th>Cordenada X <sub>1</sub></th>
  <th>Cordenada X <sub>2</sub></th>
  <th>Valor en Ƶ</th>
</tr>
  </thead>
`;
  point.forEach((element) => {
    tabla.innerHTML += ` 
    <tr>
    <td>${element.name}</td>
    <td>${element.coords.usrCoords[1].toFixed(2)}</td>
    <td>${element.coords.usrCoords[2].toFixed(2)}</td>
    <td>${(
      z_x1.value * element.coords.usrCoords[1].toFixed(2) +
      z_x2.value * element.coords.usrCoords[2].toFixed(2)
    ).toFixed(2)}</td>
  </tr>`;
  });
};

const validarInputs = () => {
  let re = new RegExp("-*[0-9]+");
  if (
    z_x1.value.length > 0 &&
    re.test(z_x1.value) &&
    z_x2.value.length > 0 &&
    re.test(z_x2.value) &&
    x1.value.length > 0 &&
    re.test(x1.value) &&
    x2.value.length > 0 &&
    re.test(x2.value) &&
    op.value.length > 0 &&
    res.value.length > 0 &&
    re.test(res.value)
  ) {
    return true;
  } else return false;
};

function mostrarSistema() {
  document.querySelector(".sistema").innerHTML = `
  ${document.getElementById("aside-select").value.toUpperCase()}: 
  Ƶ: ${z_x1.value}X<sub>1</sub> + ${z_x2.value}X<sub>2</sub> 
  ${functions
    .map((e) => {
      return `${e[0]}X<sub>1</sub> + ${e[1]}X<sub>2</sub> ${e[4]} ${e[2]}`;
    })
    .join("\n  ")}
  X1, X2 ≥ 0

`;
}
