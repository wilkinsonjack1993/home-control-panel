export {};

const template = document.createElement("template");
template.innerHTML = `
    <style>

    #controls-panel-group {
      background-color: lightgreen;
      margin-bottom: var(--padding-large);
      border-radius: var(--border-radius);
      box-shadow: 1px 1px 1px 1px lightgray;
      border: 0.5px solid lightgray;
    }

    #control-panel-group-header {
      padding: var(--padding-small) var(--padding-large);
    }

    </style>

    <div id="controls-panel-group">
        <div id="control-panel-group-header">
          <h3 id="control-panel-group-title"></h3>
        </div>
        <slot/>
    </div>
          
`;

class ControlPanelGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;
    shadowRoot.appendChild(template.content.cloneNode(true));
    // Set the title of the Control Panel Group from the passed in attribute.
    const titleElement = shadowRoot.getElementById("control-panel-group-title");

    if (!titleElement) return;
    titleElement.innerHTML = this.getAttribute("title") || "";
  }
}

customElements.define("control-panel-group", ControlPanelGroup);
