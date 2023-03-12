 class component extends HTMLElement {
    constructor(){
        super();
        this.value ;
    }
    static get observedAttributes(){
        return ["name","num"];
    }
    attributeChangeCallback(funcionAtr, oldValue, newValue){
        this.value= newValue;
    }
    connectedCallback(){
        this.innerHTML = `<div id="${this.getAttribute("num")}" class="content-funciones-funcion ">${this.getAttribute('funcion')}<i id="${this.getAttribute("num")}" class="fa-solid fa-trash"></i></div>`;
    }

 }
 window.customElements.define("crear-funcion",component);

