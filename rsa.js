function calcularD(z,e){
    for (let i = 0; i < z; i++) {
       if(((i*e)%z)==1){
        return i;
       }
        
    }
}
console.log(calcularD(396,17));