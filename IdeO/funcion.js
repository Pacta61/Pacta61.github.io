//Se declara el componente para insertar funciones
class component extends HTMLElement {
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
    this.innerHTML = `<div id="${
      this.getAttribute("num") + "a"
    }" class="content-funciones-funcion ">
        <div class="color" style="background-color: ${this.getAttribute(
          "color"
        )};"></div>
        <div class="text-funcion">${this.getAttribute("funcion")}</div>
        <i  id="${this.getAttribute(
          "num"
        )}" class="fa-solid fa-trash borrar"></i>
        <i  id="${this.getAttribute(
          "num"
        )}" class="fa-solid fa-pen-to-square"></i>
        </div>`;
  }
}
window.customElements.define("crear-funcion", component);
