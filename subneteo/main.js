

let subredes = document.querySelector('#opc1')
let  host = document.getElementById('opc2')
let btn = document.querySelector('.content-form-btn')
let ip = document.querySelector('#ip')
let mascara = document.querySelector('#Mascara')
let mascaraSubred = document.querySelector('#mascara-subred')

subredes.addEventListener('change',(e)=>{
    host.value = Math.pow(2,24)/e.target.value;
})
host.addEventListener('change',(e)=>{
   subredes.value = Math.pow(2,24)/e.target.value;
})


btn.addEventListener('click',(e)=>{
    e.preventDefault();

    
    let ipv4 = new RegExp('^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$')
     

    if(ipv4.test(ip.value) && ipv4.test(mascara.value)){
        crearTabla(ip.value,subredes.value)
        mascaraSubred.value  = (mascara.value.split('.')[0])+'.'+convertirIP(host.value*(subredes.value-1))
    }else alert('IP o mascara Incorrecta') 
    
})

