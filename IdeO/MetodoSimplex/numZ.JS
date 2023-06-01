//Se declara el componente para insertar funciones
function crearComponente2(n) {
  let res = [];
  for (let i = 1; i <= n; i++) {
    res.push(`
      <input id="${i}z" type="text" name="" class="funcion" style="background-color: transparent;"/>
      <label>X<sub>${i}</sub></label>`);
  }
  return res;
}

class component3 extends HTMLElement {
  constructor() {
    super();
    this.value;
  }
  static get observedAttributes() {
    return ["name", "num", "color"];
  }
  attributeChangeCallback(funcionAtr, oldValue, newValue) {
    this.value = newValue;
  }
  connectedCallback() {
    this.innerHTML = `
      <div class="content-funciones">Ƶ:
      ${crearComponente2(this.getAttribute("num")).join("+")}
      </div>
      
      `;
  }
}
window.customElements.define("form-z", component3);
