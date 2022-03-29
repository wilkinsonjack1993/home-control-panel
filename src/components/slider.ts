export {};

const DEFAULT_VALUE = 50;

const template = document.createElement("template");
template.innerHTML = `
<style>
#slider-container {
  width: 100%;
}

#slider {
  -webkit-appearance: none;  
  appearance: none;
  width: 100%; 
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

/* Mouse-over effects */
#slider:hover {
  opacity: 1;
}

#slider::-webkit-slider-thumb {
  -webkit-appearance: none; 
  appearance: none;
  width: 25px;
  height: 25px;
  background: #04AA6D; 
  cursor: pointer; 
}

#slider::-moz-range-thumb {
  width: 25px; 
  height: 25px; 
  background: #04AA6D;
  cursor: pointer; 
}

#slider-label {
    display: none;
}
</style>

<div id="slider-container">
  <label for="slider" id="slider-label">Slider label</label>
  <input id="slider" 
    type="range" 
    min="1" 
    max="100" 
    value="${DEFAULT_VALUE}"
    aria-valuemin="1"
    aria-valuemax="100"
    aria-valuenow="${DEFAULT_VALUE}" 
    aria-orientation="horizontal"
    >
    <output for="slider" id="slider-output">${DEFAULT_VALUE}</output>
</div>
`;

/**
 * @param {string} label - The label use as aria-label for the component.
 * @param {number} initial-value - The initial value of the slider.
 * @param {string} event-id - Optional. If given, when the toggle state is changed, an event with this id will be emitted with the new checked state.
 */
class Slider extends HTMLElement {
  private eventId: string | null;
  private onChange = (evt: Event) => this.updateValue.bind(this)(evt);

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    // Get attributes from element
    const initialValue = this.getAttribute("initial-value");
    if (initialValue) {
      this.setValue(initialValue);
    }

    this.eventId = this.getAttribute("event-id");

    const label = this.getAttribute("label");
    if (label) {
      const labelElement = this.getLabel();
      labelElement.innerHTML = label;
    }
  }

  connectedCallback() {
    const input = this.getInput();
    if (input) {
      input.addEventListener("input", this.onChange);
    }
  }

  disconnectedCallback() {
    this.getInput().removeEventListener("input", this.onChange);
  }

  updateValue(event: Event) {
    const newValue = (event?.target as HTMLInputElement).value;
    if (newValue) {
      this.setValue(newValue);

      // Emit the event to any listening entities.
      if (this.eventId) {
        this.dispatchEvent(
          new CustomEvent(this.eventId, {
            detail: { value: newValue },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  // Set the value of the slider.
  setValue(value: string) {
    const input = this.getInput();
    input.value = value;
    input.ariaValueNow = value;

    const output = this.getOutput();
    output.value = value;
    output.innerHTML = value;
  }

  // Return the input element.
  getInput() {
    return this.shadowRoot?.getElementById("slider") as HTMLInputElement;
  }

  // Return the input element.
  getOutput() {
    return this.shadowRoot?.getElementById(
      "slider-output"
    ) as HTMLOutputElement;
  }

  // Return the input element.
  getLabel() {
    return this.shadowRoot?.getElementById("slider-label") as HTMLLabelElement;
  }
}

customElements.define("slider-control", Slider);
