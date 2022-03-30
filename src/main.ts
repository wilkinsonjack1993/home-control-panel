import "./components/control-panel-group";
import "./components/control-panel-item";
import "./components/toggle-button";
import "./components/slider";
import "./components/notifications";

import { BASE_THEME } from "./theme/theme";
import { HOUSE_CONTROLS } from "./data";
import { createControlPanelItem } from "./create-control-panel-item";

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
        <control-change-notifications/>
      </header>
      <main>
        <div id="controls-panel">
        </div>
      </main>
    </div>
`;

// Main application, take data from HOUSE_CONTROLS and create control panel groups and items accordingly.
class Application extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    // Iterate through the data for all the house controls and create the corresponding elements.
    // Then append them to the controls panel.
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
}

customElements.define("application-root", Application);
