


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
 
      info.push([
        i+1,
         `${clave}.${id_subred}`,
         `${clave}.${convertirIP(hostRed+1)} - ${clave}.${convertirIP(hostRed+(num_host-2))}`,
        `${clave}.${convertirIP(hostRed+(num_host-1))}`
      ])
        
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


function crearTabla(ip,num){


    let datos = subnetear(ip,num);
 new gridjs.Grid({
      pagination: {
          limit: 10,
          enabled: true,
          summary: false
      },
      columns: ['ID',"Direccion de subred", "Rango", "Broadcast"],
      data: datos,
      style: {
          td: {
            border: '1px solid #ccc',
            background: '#ddd'
          },
          table: {
            'font-size': '15px'
          },
          th:{
              background: 'black',
              color: '#fff'
          },
          thead: {
              position: 'sticky',
              top: 0
          }
        }
    }).render(document.getElementById("example-table"));
    
  }
