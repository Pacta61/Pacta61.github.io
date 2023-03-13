//Crear grafica
const b = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-1, 10, 10, -1], axis:true
});

function crearGrafica(){
    const b = JXG.JSXGraph.initBoard('jxgbox', { 
        boundingbox: [-1, 10, 10, -1], axis:true
    });
    var p1 = b.create('point',[document.getElementById("x").value,0], {name:'B',size:2,color:'#000036'});
    var p2 = b.create('point',[0,document.getElementById("y").value], {name:'A',size:2,color:'#000036'});
    var li = b.create('line',["B","A"], {straightFirst:false, straightLast:false, strokeWidth:2,strokeColor:'#6942a8'});
}

var x = 0;
const btn = document.getElementById('funcion-btn')
btn.addEventListener("click",(e)=>{
    const input2 = document.querySelector("#funcion-input");
    const re = new RegExp("([0-9]+([A-Za-z]?))\\+([0-9]+([A-Za-z]?))(<|>)[0-9]{1,4}","g");
    if(re.test(input2.value)){
        const content = document.querySelector('.content-funciones');
        const element = document.createElement('crear-funcion');
        const input = document.getElementById('funcion-input')
        element.setAttribute("funcion",input.value)
        element.setAttribute("num",x)
        content.appendChild(element);
        input.value = '';
        x++;
    }
    
})
const content = document.querySelector('.content-funciones');

content.addEventListener("click",(e)=>{
    const element = document.getElementById(e.target.id)
    console.log(e.target.className)
    if(e.target.className == "fa-solid fa-trash borrar"){
        element.remove();
    }
    
},0)

