export {};

const template = document.createElement("template");
template.innerHTML = `
    <style>

    #controls-panel-group {
      background-color: lightgreen;
      margin-bottom: 30px;
    }

    </style>

    <div id="controls-panel-group">
        <h4 id="control-panel-group-title"></h4>
        <slot/>
    </div>
          
`;

class ControlPanelGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
