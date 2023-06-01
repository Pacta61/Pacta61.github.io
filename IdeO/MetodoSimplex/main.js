let numVariables = document.getElementById("main-form-input");
let btnAcep = document.getElementById("input-btn");
let formFunc = document.getElementById("form-func");
let content = document.getElementById("content");
let contentFunc = document.getElementById("content-func");
let btnResol = document.getElementById("btn-resol");
let matriz = [];
let idFunc = 0;

//Genera el formulario con el numero de varibles dado
btnAcep.addEventListener("click", (e) => {
  e.preventDefault();
  matriz = [];
  content.innerHTML = "";
  let comp = document.createElement("form-inecuaciones");
  comp.setAttribute("num", numVariables.value);
  content.appendChild(comp);

  //Agrega una nueva funcion a la matriz
  document.getElementById("btn-func").addEventListener("click", (e) => {
    e.preventDefault();
    let aux = [];
    let funcionMatriz = [];
    funcionMatriz.push(idFunc);

    for (let i = 1; i <= numVariables.value; i++) {
      aux.push(`${document.getElementById(i).value}X<sub>${i}</sub>`);
      funcionMatriz.push(document.getElementById(i).value);
    }
    let newFunc = document.createElement("crear-funcion");
    aux = aux.join(" + ");
    aux +=
      " " +
      document.getElementById("select-func").value +
      " " +
      document.getElementById("res-func").value;
    newFunc.setAttribute("funcion", aux);
    newFunc.setAttribute("num", idFunc);
    contentFunc.appendChild(newFunc);

    funcionMatriz.push(document.getElementById("res-func").value);
    funcionMatriz.push(document.getElementById("select-func").value);
    matriz.push(funcionMatriz);
    clearInputs();
    idFunc++;
  });
});
//Elimina una funcion de la matriz
contentFunc.addEventListener("click", (e) => {
  2;
  e.preventDefault();
  const element = document.getElementById(e.target.id + "a");
  //Eliminar
  if (e.target.className == "fa-solid fa-trash borrar") {
    element.remove();
    matriz.map((element, pos) => {
      if (element[0] == e.target.id) {
        matriz[pos] = null;
      }
    });
    //Editar
  } else if (e.target.className == "fa-solid fa-pen-to-square") {
    element.remove();
    matriz.map((element, pos) => {
      if (element[0] == e.target.id) {
        for (let i = 1; i <= numVariables.value; i++) {
          document.getElementById(i).value = element[i];
        }
        document.getElementById("res-func").value = element[element.length - 2];
        document.getElementById("select-func").value =
          element[element.length - 1];
        matriz[pos] = null;
      }
    });
  }
  matriz = matriz.filter((el) => el !== null);
});

btnResol.addEventListener("click", (evt) => {
  evt.preventDefault();
  contentRes.innerHTML = "";
  matriz = matriz.map((e) => {
    let aux = e.filter((el) => typeof el != "number");
    aux.pop();
    return aux;
  });
  let z = [
    document.getElementById("z-x1").value,
    document.getElementById("z-x2").value,
  ];
  console.table(metodoSimplex(matriz, z));
  console.log(matriz);
  console.log(z);
});

function clearInputs() {
  for (let i = 1; i <= numVariables.value; i++) {
    document.getElementById(i).value = "";
  }
  document.getElementById("res-func").value = "";
}
