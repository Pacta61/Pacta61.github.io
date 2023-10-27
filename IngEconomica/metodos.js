let valores = [-3,4,5,6,8]
let tasaInteres1 = 8;
let tasaInteres2 = 20;
let II = 16;



function VPN(valores, tasaInteres, II){
    II *= -1;
    tasaInteres /= 100;
    let sum = valores.reduce((res,valor,index)=>{return  res += valor/Math.pow((1 + tasaInteres),index+1)},II);
    return sum;
}



function PRI(valores,II){
    let table = [], FEA = [], utilidad = [];
    valores.reduce((res, val, index)=>{FEA.push(res + val); return res += val},II * -1)
    valores.reduce((res, val, index)=>{utilidad.push(res + val); return res += val},0)
    table.push(valores,FEA,utilidad);
    let a, b ,c ;
    let añoRecu = FEA.indexOf(FEA.filter(e => e > 0)[0]);
    a =  FEA[añoRecu - 1];
    b = utilidad[añoRecu -1 ]
    c = valores[añoRecu];
    let res = añoRecu + ((II - b)/ c )
    return res.toFixed(3) ;
}

function toTime(num){
    let valores = [ {txt: " Años", num: 0},
                    {txt: " Meses", num: 12},
                    {txt: " Dias", num: 30},
                    {txt: " Horas", num: 24},
                    {txt: " Minutos", num: 60},
                    {txt: " Segundos", num: 60},]
    let res = [parseInt(num) + valores[0].txt]
    num -= parseInt(num);
    
    for (let i = 1; i <= 5; i++) {
       if(num > 0){
        let x = num * valores[i].num;
        num = x;
        x = Math.trunc(x);
        num -= x;
        res.push(x + valores[i].txt)
       }
        
    }
    return res.join(" ");
}


function VAE(valores, tasa, II){
    let vpn = VPN(valores,tasa,II)
    tasa =  tasa / 100;
    return (vpn * tasa) / (1 - (1 / Math.pow((1 + tasa),valores.length)))
}





TIR = (problema = {}) => {
    let tir = 0;
    let maxIteraciones = 1000; 
    let precision = 0.00001; 
    let tirMin = 0;
    let tirMax = 100;
    let historial = [];
    for (let i = 0; i < maxIteraciones; i++) {
        tir = (tirMin + tirMax) / 2; 
        let vpn = -problema.inversionInicial;
        for (let j = 0; j < problema.flujosDeEfectivo.length; j++) {
            vpn += (problema.flujosDeEfectivo[j]) / Math.pow((1 + (tir / 100)), j + 1);
        }
        historial.push(
            {
                "tir": tir,
                "vpn": vpn
            }
        )
        if (Math.abs(vpn) < precision) {
            return {
                "tir": tir,
                "historial": historial
            }
        }
        if (vpn > 0) {
            tirMin = tir;
        } else {
            tirMax = tir;
        }
    }
    return NaN;
}
