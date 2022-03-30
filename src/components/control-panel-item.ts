export {};

const template = document.createElement("template");
template.innerHTML = `
    <style>
    #controls-panel-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--background-default);
      border-top: 1px solid gray;
      padding: var(--padding-large);
      font-family: var(--font-family);
    }

    @media (max-width: 400px) {
      #controls-panel-item {
        flex-direction: column;
        align-items: stretch;
      }

      #controls-panel-item-label {
        margin-bottom: var(--padding-small);
        align-self: center;
      }
    }

    #controls-panel-item-controller {
      display: flex;
      flex-grow: 2;
      align-items: center;
      justify-content: center;
    }

    #controls-panel-item-label {
      display: flex;
      flex-grow: 1;
      max-width: 200px;
      align-items: center;
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
