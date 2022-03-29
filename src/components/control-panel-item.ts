export {};

const template = document.createElement("template");
template.innerHTML = `
    <style>
    #controls-panel-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: lightblue;
    }
    </style>
  
    <div id="controls-panel-item">
        <div id="controls-panel-item-label">
            <slot name="label">
        </div>
        <div id="controls-panel-item-controller">
            <slot name="controller">
        </div>
    </div>
`;

class ControlPanelItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("control-panel-item", ControlPanelItem);
