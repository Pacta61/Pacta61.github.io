let numVariables = document.getElementById("main-form-input");
let btnAcep = document.getElementById("input-btn");
let formFunc = document.getElementById("form-func");
let content = document.getElementById("content");
let contentFunc = document.getElementById("content-func");
let matriz = [];
let idFunc = 0;

//Genera el formulario con el numero de varibles dado
btnAcep.addEventListener("click", (e) => {
  e.preventDefault();
  content.innerHTML = "";
  let comp = document.createElement("form-inecuaciones");
  comp.setAttribute("num", numVariables.value);
  content.appendChild(comp);

  //Agrega una nueva funcion a la matriz
  document.getElementById("btn-func").addEventListener("click", (e) => {
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
  const element = document.getElementById(e.target.id + "a");
  if (e.target.className == "fa-solid fa-trash borrar") {
    element.remove();
    matriz.map((element, pos) => {
      if (element[0] == e.target.id) {
        matriz[pos] = null;
      }
    });
  }
  matriz = matriz.filter((el) => el !== null);
});

function clearInputs() {
  for (let i = 1; i <= numVariables.value; i++) {
    document.getElementById(i).value = "";
  }
  document.getElementById("res-func").value = "";
}
