//Se declara el componente para insertar funciones
function crearComponente(n) {
  let res = [];
  for (let i = 1; i <= n; i++) {
    res.push(`<label>X<sub>${i}</sub></label>
    <input id="${i}" type="text" name="" class="funcion" />`);
  }
  return res;
}

class component2 extends HTMLElement {
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
    <div class="content-funciones">
    ${crearComponente(this.getAttribute("num")).join("+")}
    <select name="" id="select-func">
        <option value="≥">≥</option>
        <option value="≤">≤</option>
        <option value="=">=</option>
      </select>
    <input type="text" name="" class="funcion" id="res-func" />
    <button id="btn-func"><i class="fa-solid fa-check"></i></button>
    </div>
    
    `;
  }
}
window.customElements.define("form-inecuaciones", component2);
