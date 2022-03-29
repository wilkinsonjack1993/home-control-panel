import "./components/control-panel-group";
import "./components/control-panel-item";
import "./components/toggle-button";
import "./components/slider";
import { BASE_THEME } from "./theme/theme";
import { HOUSE_CONTROLS } from "./data";
import { createControlPanelItem } from "./createControlPanelItem";

const template = document.createElement("template");
template.innerHTML = `
    <style>
    #app-root {
      ${BASE_THEME}
      min-height: 100vh;
      min-width: 100vw;
    }

    #controls-panel {
      display: flex;
      flex-direction: column;
      max-width: 800px;
      margin: 0 auto;
    }

    #slot {
      width: 100%;
    }

    header {
      padding: var(--padding-medium) var(--padding-large);
      font-family: var(--font-family);
    }

    </style>
    <div id="app-root">
      <header>
        <h2>My Home Control Panel</h2>
      </header>
      <main>
        <div id="controls-panel">
        </div>
      </main>
    </div>
`;

class Application extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    HOUSE_CONTROLS.map((group) => {
      const groupElement = document.createElement("control-panel-group");
      groupElement.title = group.title;
      group.controls.map((control) => {
        const controlElement = createControlPanelItem(control);
        groupElement.appendChild(controlElement);
      });

      this.shadowRoot
        ?.getElementById("controls-panel")
        ?.appendChild(groupElement);
    });
  }

  connectedCallback() {
    // TODO - do something here - remove it?
    document.addEventListener("toggle-button-event", () => {
      console.log("toggle-button-event-recieved");
    });
  }
}

customElements.define("application-root", Application);
