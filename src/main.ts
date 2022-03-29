import "./components/control-panel-group";
import "./components/control-panel-item";
import "./components/toggle-button";
import "./components/slider";

const template = document.createElement("template");
template.innerHTML = `
    <style>
    #app-root {
      min-height: 100vh;
      min-width: 100vw;
    }

    #controls-panel {
      display: flex;
      flex-direction: column;
      max-width: 800px;
      margin: 0 auto;
    }

    </style>
    <div id="app-root">
      <header>
        <h2>My Home Control Panel</h2>
      </header>
      <main>
        <div id="controls-panel">
          <control-panel-group title="Lights">
            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller">
                <toggle-button label="toggle test" on-text="open" off-text="closed" initial-state="true">button</toggle-button>
              </div>
            </control-panel-item>

            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller"><slider-control/></div>
            </control-panel-item>

            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller">Controller Here</div>
            </control-panel-item>
          </control-panel-group>

          <control-panel-group title="Garden">
            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller">Controller Here</div>
            </control-panel-item>

            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller">Controller Here</div>
            </control-panel-item>

            <control-panel-item>
              <div slot="label">Label Here</div>
              <div slot="controller">Controller Here</div>
            </control-panel-item>
          </control-panel-group>
        </div>
      </main>
    </div>
`;

class Application extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // TODO - do something here - remove it?
    document.addEventListener("toggle-button-event", () => {
      console.log("toggle-button-event-recieved");
    });
  }
}

customElements.define("application-root", Application);
