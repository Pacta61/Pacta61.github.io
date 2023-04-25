



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
    let clave 
    let info = []

    let clase = ip[0];
    if(clase <= 127){
      clave = clase;
    }else if(clase <= 191){
      ip.pop()
      ip.pop()
      clave = ip.join('.');
    }else if(clase <= 223){
      ip.pop()
      clave = ip.join('.');
    }
    
    while(!esPotenciaDeDos(num_subredes)){
        num_subredes++;
    }

    let num_host = Math.pow(2,24)/num_subredes
    
    for (let i = 0; i < num_subredes; i++) {
      let hostRed = num_host*i
        id_subred = convertirIP(hostRed);
        if(clase <= 127){
          info.push({
            id: i+1,
             subid:`${clave}.${id_subred}`,
             rango: `${clave}.${convertirIP(hostRed+1)} - ${clave}.${convertirIP(hostRed+(num_host-2))}`,
            broadcast: `${clave}.${convertirIP(hostRed+(num_host-1))}`
        })
        }else if(clase <= 191){
          let rango1 = convertirIP(hostRed+1).split('.')
          let rango2 = convertirIP(hostRed+(num_host-2)).split('.')
          info.push({
            id: i+1,
             subid:`${clave}.${id_subred.split('.')[0]}.${id_subred.split('.')[1]}`,
             rango: `${clave}.${rango1[0]}.${(num_subredes<32768)?parseInt(rango1[1])+parseInt(rango1[2]):rango1[1]} - ${clave}.${rango2[0]}.${(num_subredes<256)?rango2[2]:(num_subredes<32768)?rango2[1]-1:rango2[1]}`,
            broadcast: `${clave}.${rango2[0]}.${rango2[1]}`
        })
          
        }else if(clase <= 223){
          let rango1 = convertirIP(hostRed+1).split('.')
          let rango2 = convertirIP(hostRed+(num_host-2)).split('.')
          info.push({
            id: i+1,
             subid:`${clave}.${id_subred.split('.')[0]}`,
             rango: `${clave}.${(num_subredes<128)?parseInt(rango1[0])+parseInt(rango1[2]):rango1[0]} - ${clave}.${(num_subredes<128)?rango2[0]-1:rango2[0]}`,
            broadcast: `${clave}.${id_subred.split('.')[0]}`
        })
        }
      
        
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
