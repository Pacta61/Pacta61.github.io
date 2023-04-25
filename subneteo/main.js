let subredes = document.querySelector("#opc1");
let host = document.getElementById("opc2");
let btn = document.querySelector(".content-form-btn");
let ip = document.querySelector("#ip");
let mascara = document.querySelector("#Mascara");
let mascaraSubred = document.querySelector("#mascara-subred");
let select = document.querySelectorAll("select");
let claseA = `
<option value="1">1</option>
<option value="2">2</option> 
<option value="4">4</option>
<option value="8">8</option>
<option value="16">16</option>
<option value="32">32</option>
<option value="64">64</option>
<option value="128">128</option>
<option value="256">256</option>
<option value="512">512</option>
<option value="1024">1024</option>
<option value="2048">2048</option>
<option value="4096">4096</option>
<option value="8192">8192</option>
<option value="16384">16384</option>
<option value="32768">32768</option>
<option value="65536">65536</option>
<option value="131072">131072</option>
<option value="262144">262144</option>
<option value="524288">524288</option>
<option value="1048576">1048576</option>
<option value="2097152">2097152</option>
<option value="4194304">4194304</option>`;
let claseB = ` 
<option value="1">1</option>
<option value="2">2</option> 
<option value="4">4</option>
<option value="8">8</option>
<option value="16">16</option>
<option value="32">32</option>
<option value="64">64</option>
<option value="128">128</option>
<option value="256">256</option>
<option value="512">512</option>
<option value="1024">1024</option>
<option value="2048">2048</option>
<option value="4096">4096</option>
<option value="8192">8192</option>
<option value="16384">16384</option>
<option value="32768">32768</option>
<option value="65536">65536</option>`;
let claseC = ` 
<option value="1">1</option>
<option value="2">2</option> 
<option value="4">4</option>
<option value="8">8</option>
<option value="16">16</option>
<option value="32">32</option>
<option value="64">64</option>
<option value="128">128</option>
<option value="256">256</option>
`;
let claseBh = ` 
<option value="256">256</option>
<option value="512">512</option>
<option value="1024">1024</option>
<option value="2048">2048</option>
<option value="4096">4096</option>
<option value="8192">8192</option>
<option value="16384">16384</option>
<option value="32768">32768</option>
<option value="65536">65536</option>
<option value="131072">131072</option>
<option value="262144">262144</option>
<option value="524288">524288</option>
<option value="1048576">1048576</option>
<option value="2097152">2097152</option>
<option value="4194304">4194304</option>
<option value="8388608">8388608</option>
<option value="16777216">16777216</option>
`;
let claseCh = ` 
<option value="65536">65536</option>
<option value="131072">131072</option>
<option value="262144">262144</option>
<option value="524288">524288</option>
<option value="1048576">1048576</option>
<option value="2097152">2097152</option>
<option value="4194304">4194304</option>
<option value="8388608">8388608</option>
<option value="16777216">16777216</option>`;

//Obteniendo la clase de red
let clase = ip.value.split('.')[0];
if(clase <= 127){
    clase = 'A';
}else if(clase <= 191){
    clase = 'B';
}else if(clase <= 223){
    clase = 'C';
}
let mascaraA= new RegExp(
    "^255\\.0\\.0\\.0$"
  );
  let mascaraB= new RegExp(
    "^255\\.255\\.0\\.0$"
  );
  let mascaraC= new RegExp(
    "^255\\.255\\.255\\.0$"
  );
console.log(select)
mascara.addEventListener("input", (e) => {
    let clase = ip.value.split('.')[0];
    if(clase <= 127 && mascaraA.test(mascara.value)){
        select.forEach((e)=>{e.innerHTML = claseA})

    }else if(clase >= 128 && clase <= 191 && mascaraB.test(mascara.value)){
        select[0].innerHTML = claseB;
        select[1].innerHTML = claseBh;

    }else if(clase >= 192 && clase <= 223 && mascaraC.test(mascara.value)){
        select[0].innerHTML = claseC;
        select[1].innerHTML = claseCh;

    }else select.forEach((e)=>{e.innerHTML = ''})
});
ip.addEventListener("input", (e) => {
        let clase = ip.value.split('.')[0];
        if(clase <= 127 && mascaraA.test(mascara.value)){
            select.forEach((e)=>{e.innerHTML = claseA})

        }else if(clase >= 128 && clase <= 191 && mascaraB.test(mascara.value)){
            select.forEach((e)=>{e.innerHTML = claseB})

        }else if(clase >= 192 && clase <= 223 && mascaraC.test(mascara.value)){
            select.forEach((e)=>{e.innerHTML = claseC})

        }else select.forEach((e)=>{e.innerHTML = ''})
    });
subredes.addEventListener("change", (e) => {
  host.value = Math.pow(2, 24) / e.target.value;
  console.log(e.target.value)
});
host.addEventListener("change", (e) => {
  subredes.value = Math.pow(2, 24) / e.target.value;
});



btn.addEventListener("click", (e) => {
  e.preventDefault();

  let ipv4 = new RegExp(
    "^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$"
  );

  if (ipv4.test(ip.value) && ipv4.test(mascara.value)) {
    crearTabla(ip.value, subredes.value);
    
      
      let clase = ip.value.split('.')[0];
      let bits = Math.log2(subredes.value);
    if(clase <= 127 && mascaraA.test(mascara.value)){
        mascaraSubred.value  = (mascara.value.split('.')[0])+'.'+convertirIP(host.value*(subredes.value-1))

    }else if(clase >= 128 && clase <= 191 && mascaraB.test(mascara.value)){
        let mask = (mascara.value.split('.'))
        mask.pop();
        mask.pop();
        mask = mask.join('.');
        if(subredes.value<=256){
            mascaraSubred.value = `${mask}.${((host.value*(subredes.value-1))/256)/256}.0` 
        }else{
            mascaraSubred.value = `${mask}.255.${(((subredes.value-1)*host.value)/256)%256}` 
        }
       

    }else if(clase >= 192 && clase <= 223 && mascaraC.test(mascara.value)){
        //mascara clase C
        let mask = (mascara.value.split('.'))
        mask.pop();
        mask = mask.join('.');
        mascaraSubred.value = `${mask}.${((host.value*(subredes.value-1))/256)/256}` 
         
    
    }
  } else alert("IP o mascara Incorrecta");
});

//define some sample data
