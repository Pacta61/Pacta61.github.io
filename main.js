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

  obtenerMinNum(valores);
  let rectas = [];
  let points = [];
  valores.forEach((element) => {
    let p2 = b.create("point", [0, element[1]], { size: 2, Color: "#9a080b" });
    let p1 = b.create("point", [element[0], 0], { size: 2, Color: "#9a080b" });
    rectas.push(
      b.create("line", [p1, p2], {
        straightFirst: false,
        straightLast: false,
        strokeWidth: 2,
        strokeColor: colores[element[2]],
      })
    );
    points.push(p1);
    points.push(p2);
    console.log(points);
  });
  //Calculando intersecciones
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
  crearTabla(points);
}
var colores = [
  "#ffd22c",
  "#121d7a",
  "#7ef25c",
  "#82005f",
  "#37231b",
  "#a20c31",
  "#ff8369",
  "#2099d8",
  "#82b800",
  "#fa6d5e",
  "#1b1507",
  "#ff0096",
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
    document.querySelector("#op").value = "";
    document.querySelector("#res").value = "";
    x++;

    console.log(functions);
  }else  alert("Debe rellenar todos los campos")
});
const content = document.querySelector(".content-funciones");

//Remover funciones
content.addEventListener(
  "click",
  (e) => {
    const element = document.getElementById(e.target.id);
    if (e.target.className == "fa-solid fa-trash borrar") {
      element.remove();
      functions[e.target.id] = null;
      functions = functions.filter((el) => el !== null);
    }
  },
  0
);

//optiene los valores con el valor del input
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
    resul.push([elem[2] / elem[0], elem[2] / elem[1], elem[3]]);
  });
  console.log(resul);
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
  console.log(max);
  return max;
};
const obtenerMinNum = (a) => {
  let min = 1000,
    aux;
  a.forEach((elem) => {
    aux = Math.min(elem[0], elem[1]);
    min = aux < min ? aux : min;
  });
  console.log(min);
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
    <td>${
      (z_x1.value * element.coords.usrCoords[1].toFixed(2) +
      z_x2.value * element.coords.usrCoords[2].toFixed(2)).toFixed(2)
    }</td>
  </tr>`;
  });
};

const validarInputs = () => {
  let re = new RegExp('[0-9]+');
  if (
    z_x1.value.length > 0 && re.test( z_x1.value)&&
    z_x2.value.length > 0 && re.test( z_x2.value)&&
    x1.value.length > 0 && re.test( x1.value)&&
    x2.value.length > 0 && re.test( x2.value)&&
    op.value.length > 0 && 
    res.value.length > 0 && re.test( res.value)
  ) {
    return true;
  } else return false;
};
