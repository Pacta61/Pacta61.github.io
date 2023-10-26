let btnAño = document.getElementById("btn-año");
let btnCalcular = document.getElementById("btn-calcular");
let res = document.getElementById("res");
let opc = document.getElementById("opciones");
let contentT2 = document.getElementById("tasa2");
let t2 = document.getElementById("t2");
let numAños = 5;
btnAño.addEventListener("click", (e)=>{
    e.preventDefault();
    numAños++;
    document.getElementById("content-año").appendChild(generarComponente(numAños))
})
btnCalcular.addEventListener("click",(e)=>{
    e.preventDefault();
    let datos = obtenerDatos();
    let opcSelec = parseInt(opc.value);
    console.log(datos);
    res.style.display = "flex"
    if(opcSelec == 2){
        res.innerText = "P.R.I = " + toTime(parseFloat(PRI(datos.valores,datos.invInicial)));
    }else if (opcSelec == 1){
        res.innerText = "V.P.N = " + VPN(datos.valores,datos.tasa,datos.invInicial);
    }else if (opcSelec == 4){
        res.innerText = "T.I.R = " + TIR(datos.valores,datos.tasa, parseFloat(t2.value), datos.invInicial);
    }else if(opcSelec == 3){
         res.innerText = "V.A.E = " + VAE(datos.valores,datos.tasa,datos.invInicial);
    }
    
})
opc.addEventListener("change",()=>{
    if(opc.value == "4"){
        contentT2.style.display = "flex";
    }else contentT2.style.display = "none";
})


function obtenerDatos(){
    let valores = [];
    for (let i = 1; i <= numAños; i++) {
        valores.push(parseFloat(document.getElementById(i).value))
    }
    valores = valores.filter(e => e != undefined)
    return {valores : valores,
            invInicial: parseFloat( document.getElementById("inv-inicial").value), 
            tasa: parseFloat(document.getElementById("tasa").value)
        };
}


function generarComponente(id){
    let content = document.createElement("div");
    let label = document.createElement("label");
    let input = document.createElement("input");
    label.innerText = `Año ${id}: `;
    input.type = "number";
    input.id = id;
    label.for = id;
    content.classList.add("input-año");
    content.appendChild(label)
    content.appendChild(input)

    return content;
}