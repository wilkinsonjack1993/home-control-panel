export interface ToggleControlItem extends HTMLElement {
  label: string;
  initialState?: boolean;
  onText?: string;
  offText?: string;
  eventId: string;
}

const DEFAULT_ON_LABEL = "On";
const DEFAULT_OFF_LABEL = "Off";

const template = document.createElement("template");
template.innerHTML = `
    <style>
    #toggle-button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #toggle-button {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    #toggle-button-input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    #toggle-button-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    #toggle-button-slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + #toggle-button-slider {
        background-color: var(--secondary-color);
    }

    input:focus + #toggle-button-slider {
        box-shadow: 0 0 1px  var(--secondary-color);
    }

    input:checked + #toggle-button-slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    </style>

    <div id="toggle-button-container">
      <label id="toggle-button">
          <input aria-checked="false" tab-index=0 id="toggle-button-input" type="checkbox">
          <span id="toggle-button-slider"></span>
      </label>
      <p id="toggle-button-label">${DEFAULT_OFF_LABEL}</p>
    </div>
`;

/**
 * ToggleButton is a custom element that allows the user to toggle between two states.
 *
 * @param {string} on-text - Optional. The label to display when the toggle is in the "on" state. Default is 'On'.
 * @param {string} off-text - Optional. The label to display when the toggle is in the "off" state. Default is 'Off'.
 * @param {string} event-id - Optional. If given, when the toggle state is changed, an event with this id will be emitted with the new checked state.
 * @param {boolean} initial-state - Optional. Whether the toggle is initially on or off. Default is false.
 * @param {string} label - Aria label for the toggle button - this is important for accessibility.
 */
class ToggleButton extends HTMLElement {
  private onText = DEFAULT_ON_LABEL;
  private offText = DEFAULT_OFF_LABEL;
  private eventId: string | null = null;

  private onChange = (evt: Event) => this.toggled(evt);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    // Get the attributes from the element
    this.onText = this.getAttribute("on-text") || DEFAULT_ON_LABEL;
    this.offText = this.getAttribute("off-text") || DEFAULT_OFF_LABEL;
    this.eventId = this.getAttribute("event-id");

    const initialState = this.getAttribute("initial-state") === "true";

    // Set aria-label for accessibility
    this.getInput().ariaLabel = this.getAttribute("label") || "Toggle element";

    // If initially set to true, set the input to checked.
    if (initialState) {
      this.setInputState(initialState);
      this.setText(initialState);
    }
    const input = this.getInput();
    if (input) {
      input.addEventListener("change", this.onChange);
    }
  }

  disconnectedCallback() {
    this.getInput().removeEventListener("change", this.onChange);
  }

  // Change the text on toggle.
  setText(checked: boolean) {
    const textElement = this.shadowRoot?.getElementById(
      "toggle-button-label"
    ) as HTMLInputElement;

    if (textElement) {
      textElement.innerText = checked ? this.onText : this.offText;
    }
  }

  // Return the input element.
  getInput() {
    return this.shadowRoot?.getElementById(
      "toggle-button-input"
    ) as HTMLInputElement;
  }

  // Update the input state programatically
  setInputState(state: boolean) {
    const input = this.getInput();
    if (input) {
      input.checked = state;
      input.ariaChecked = `${state}`;
    }
  }

  // Change the text on toggle and emit an event if an event id is given.
  toggled(evt: Event) {
    this.setText((evt.target as HTMLInputElement).checked);

    // Emit the event to any listening entities.
    if (this.eventId) {
      this.dispatchEvent(
        new CustomEvent(this.eventId, {
          detail: { checked: (evt.target as HTMLInputElement).checked },
          bubbles: true,
          composed: true,
        })
      );
    }
  }
}

customElements.define("toggle-button", ToggleButton);
