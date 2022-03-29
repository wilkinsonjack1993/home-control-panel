import { HOUSE_CONTROLS, ToggleControl, SliderControl } from "../data";

const template = document.createElement("template");
template.innerHTML = `
<style>
#notifications {
    color: var(--primary-color);
    font-size: var(--font-size-large);
    height: 50px;
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<div id="notifications">
    <h4></h4>
</div>
`;

class Notifications extends HTMLElement {
  private listeners = {} as Record<string, (event: Event) => void>;
  private timeout: NodeJS.Timeout | null = null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  // For each event id add a listener so we can add a notification;
  connectedCallback() {
    HOUSE_CONTROLS.forEach((group) => {
      group.controls.forEach((control) => {
        const { type, eventId } = control;

        const listener = (event: Event) => {
          let message;
          if (type === "toggle") {
            const value = (event as CustomEvent).detail?.checked;
            message = this.getToggleMessage(control, value);
          } else if (type === "slider") {
            const value = (event as CustomEvent).detail?.value as number;
            message = this.getSliderMessage(control, value);
          }
          if (message) {
            if (this.timeout) clearTimeout(this.timeout);
            this.addNotification(message);

            this.timeout = setTimeout(() => {
              this.addNotification("");
            }, 3000);
          }
        };

        document.addEventListener(eventId, listener);
        this.listeners[eventId] = listener;
      });
    });
  }

  // Clean up listeners
  disconnectedCallback() {
    Object.keys(this.listeners).forEach((eventId) => {
      const listener = this.listeners[eventId];
      document.removeEventListener(eventId, listener);
    });
  }

  addNotification(message: string) {
    const notifications = this.shadowRoot?.getElementById("notifications");
    if (!notifications) return;
    notifications.innerHTML = message;
  }

  getToggleMessage(control: ToggleControl, value: boolean) {
    return `${control.ariaLabel} has been set to ${
      value
        ? control.onText?.toLocaleLowerCase() || "on"
        : control.offText?.toLocaleLowerCase() || "off"
    }`;
  }

  getSliderMessage(control: SliderControl, value: number) {
    return `${control.ariaLabel} has been set to ${value}`;
  }
}

customElements.define("control-change-notifications", Notifications);
