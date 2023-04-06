// Función para realizar el subneteo de una red clase B o C con un número de subredes dado
function subnetear(ip, mascara, num_subredes) {
    // Verificar si se trata de una red clase B o C
    var clase = ip.split('.')[0];
    var subredes = num_subredes;
   
  
    // Calcular el tamaño de cada subred y la cantidad de hosts disponibles
    var hosts = Math.pow(2, (32 - mascara)) - 2;
    var tamaño = Math.ceil(hosts / num_subredes);
    var subredes_restantes = num_subredes;
    var subredes_info = [];
  
    // Crear un arreglo con la información de cada subred hasta alcanzar el número indicado
    var subred = ip.split('.');
    for (var i = 1; i <= num_subredes && subredes_restantes > 0; i++) {
      var subred_str = subred.join('.');
      var limite_superior;
      if (clase < 192) {
        limite_superior = Math.min(parseInt(subred[2]) + tamaño - 1, 255);
      } else {
        limite_superior = Math.min(parseInt(subred[3]) + tamaño - 1, 255);
      }
      var rango = subred_str + " - " + subred[0] + "." + subred[1] + "." + ((clase < 192) ? limite_superior : subred[2]) + "." + ((clase < 192) ? subred[3] : limite_superior);
      subredes_info.push({
        "subred": subred_str,
        "mascara": mascara,
        "rango": rango,
        "broadcast": subred[0] + "." + subred[1] + "." + ((clase < 192) ? limite_superior : subred[2]) + "." + ((clase < 192) ? (limite_superior + 1) : subred[3] + (tamaño - 1)),
        "hosts": (tamaño - 2),
        "tamaño": tamaño
      });
  
      // Incrementar la dirección de la subred para la siguiente iteración
      if (clase < 192) {
        subred[2] = limite_superior + 1;
      } else {
        subred[3] = limite_superior + 1;
      }
  
      // Actualizar el valor de "tamaño" para la siguiente iteración
      if (subredes_restantes == 1) {
        tamaño = hosts - (tamaño * (num_subredes - 1));
      }
  
      subredes_restantes--;
    }
  
    return subredes_info;
  }
  
  
  