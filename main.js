//Crear grafica
const b = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-1, 10, 10, -1], axis:true, showCopyright: false, grid: false 
});
//Genera la grafica e intersecciones
function crearGrafica(){
    const b = JXG.JSXGraph.initBoard('jxgbox', { 
        boundingbox: [-1, 10, 10, -1], 
        axis:true, showCopyright: false, 
        grid: false 
    });
    let valores = calcularRectas();  
    let rectas = []
    valores.forEach(element => {
        rectas.push(b.create('line',[[element[0],0],[0,element[1]]], {
            straightFirst:false, 
            straightLast:false, 
            strokeWidth:2,
            strokeColor:colores[element[2]]}));
    });
    //Calculando intersecciones
    let intersecciones = []
    for (let i = 0; i < rectas.length; i++) {
        for (let j = i+1; j < rectas.length; j++) {
            intersecciones.push(b.create('intersection', [rectas[i], rectas[j], 0],{size: 2,Color:'#9a080b'}).coords.usrCoords);
            
        }
        
    }

}
var colores = ["#ffd22c","#121d7a","#7ef25c","#82005f","#37231b","#a20c31",
"#ff8369","#2099d8","#82b800","#fa6d5e","#1b1507","#ff0096","#252525"]
var estado = 0;
var functions = [];
var x = 0;
const btn = document.getElementById('funcion-btn')
//Agregar funcion
btn.addEventListener("click",(e)=>{
    const input2 = document.querySelector("#funcion-input");
    const re = new RegExp("([0-9]+([A-Za-z]))\\+([0-9]+([A-Za-z]))(<|>)[0-9]{1,4}","g");
    if(re.test(input2.value)){
        const content = document.querySelector('.content-funciones');
        const element = document.createElement('crear-funcion');
        const input = document.getElementById('funcion-input')
        element.setAttribute("funcion",input.value)
        element.setAttribute("num",x)
        element.setAttribute("color",colores[x])
        content.appendChild(element);
        functions.push(convertirFuncion(input2.value,x));
        input.value = '';
        x++;
    }
    console.log(functions)
    
})
const content = document.querySelector('.content-funciones');

//Remover funciones
content.addEventListener("click",(e)=>{
    const element = document.getElementById(e.target.id)
    console.log(e.target.id)
    if(e.target.className == "fa-solid fa-trash borrar"){
        element.remove();
        functions[e.target.id] = null;
        functions = functions.filter(el => el !==null);
    }
    console.log(functions)
},0)

//optiene los valores con el valor del input
const convertirFuncion= (fun,x)=>{
    let res, aux
    (estado == 0)? res = fun.split("<"):res = fun.split(">");
    aux= res[0].split("+").map((elem)=>{return elem.substr(0,elem.length-1)});
    aux.push(res[1],x);
    return aux;
}

 //calcula los valores para graficar   
const calcularRectas = ()=>{
    let resul = [];
    functions.forEach(elem => {
        resul.push([elem[2]/elem[0],elem[2]/elem[1],elem[3]]);
    });
    console.log(resul);
    return resul;
}
const tipoMin = document.getElementById("tipo1");
const tipoMax = document.getElementById("tipo2");
tipoMin.addEventListener("click",()=>{
  tipoMin.style.outline = "1px solid #1750a5"
  tipoMax.style.outline = "none"
  estado = 1;
  functions  = [];
  x = 0;
  removeAllChilds(content)
})
tipoMax.addEventListener("click",()=>{
  tipoMax.style.outline = "1px solid #1750a5"
  tipoMin.style.outline = "none"
  estado = 0;
  functions  = [];
  x = 0;
  removeAllChilds(content);
})
function removeAllChilds(a)
 {
 while(a.hasChildNodes())
	a.removeChild(a.firstChild);	
 }
