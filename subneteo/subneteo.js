


const convertirIP = (num)=>{
  let x1 = num%256;
  if(num<=255){
     res = `0.0.${num}`
  }else if(num<=65536){
      res = `0.${(num-x1)/256 }.${x1}`
  }else if(num<=16777216){
    let x = (num/256)%256;
      res = `${((num/256)-x)/256}.${((num-(x1))/256)%256}.${x1}`
  }
return res;
}

function subnetear(ip,num_subredes) {

    var ip = ip.split('.');
    let clave = ip[0]
    let info = []
    
    while(!esPotenciaDeDos(num_subredes)){
        num_subredes++;
    }

    let num_host = Math.pow(2,24)/num_subredes
    
    for (let i = 0; i < num_subredes; i++) {
      let hostRed = num_host*i
        id_subred = convertirIP(hostRed);
 
      info.push({
        id: i+1,
         subid:`${clave}.${id_subred}`,
         rango: `${clave}.${convertirIP(hostRed+1)} - ${clave}.${convertirIP(hostRed+(num_host-2))}`,
        broadcast: `${clave}.${convertirIP(hostRed+(num_host-1))}`
    })
        
    }
    return info
  }



  function esPotenciaDeDos(numero) {
    if (numero < 1) {
      return false;
    }
    while (numero % 2 === 0) {
      numero = numero / 2;
    }
    return numero === 1;
  }
var tabla

function crearTabla(ip,num){
  var tabledata = subnetear(ip,num)
  //create Tabulator on DOM element with id "example-table"
  var table = new Tabulator("#example-table", {
      height:300, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      data:tabledata, //assign data to table
      layout:"fitColumns", //fit columns to width of table (optional)
      columns:[ //Define Table Columns
      {title:"id", field:"id"},
      {title:"subred", field:"subid"},
      {title:"Rango", field:"rango"},
      {title:"Broadcast", field:"broadcast"},
      ],
  });
  }
