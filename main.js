//Crear grafica
const b = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-1, 10, 10, -1], axis:true
});

function crearGrafica(){
    const b = JXG.JSXGraph.initBoard('jxgbox', { 
        boundingbox: [-1, 10, 10, -1], axis:true
    });
    let valores = calcularRectas();  
    valores.forEach(element => {
        b.create('line',[[element[0],0],[0,element[1]]], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#6942a8'});
    });
 

    calcularRectas();
}
var estado = 0;
var functions = [];
var x = 0;
const btn = document.getElementById('funcion-btn')
btn.addEventListener("click",(e)=>{
    const input2 = document.querySelector("#funcion-input");
    const re = new RegExp("([0-9]+([A-Za-z]))\\+([0-9]+([A-Za-z]))(<|>)[0-9]{1,4}","g");
    if(re.test(input2.value)){
        const content = document.querySelector('.content-funciones');
        const element = document.createElement('crear-funcion');
        const input = document.getElementById('funcion-input')
        element.setAttribute("funcion",input.value)
        element.setAttribute("num",x)
        content.appendChild(element);
        functions.push(convertirFuncion(input2.value));
        input.value = '';
        x++;
    }
    console.log(functions)
    
})
const content = document.querySelector('.content-funciones');

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


const convertirFuncion= (fun)=>{
    let res, aux
    (estado == 0)? res = fun.split("<"):res = fun.split(">");
    aux= res[0].split("+").map((elem)=>{return elem.substr(0,elem.length-1)});
    aux.push(res[1]);
    return aux;
}

    
const calcularRectas = ()=>{
    let resul = [];
    functions.forEach(elem => {
        resul.push([elem[2]/elem[0],elem[2]/elem[1]]);
    });
    return resul;
}