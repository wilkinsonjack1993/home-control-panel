import { SliderControl, ToggleControl } from "./data";
import { SliderControlItem } from "./components/slider";
import { ToggleControlItem } from "./components/toggle-button";

// TODO - These functions could definitly be cleaned up
const createSliderControl = (sliderControl: SliderControl) => {
  const sliderControlElement = document.createElement(
    "slider-control"
  ) as SliderControlItem;
  sliderControlElement.setAttribute("label", sliderControl.ariaLabel);

  if (sliderControl.eventId)
    sliderControlElement.setAttribute("event-id", sliderControl.eventId);

  if (sliderControl.min)
    sliderControlElement.setAttribute("min", sliderControl.min.toString());
  if (sliderControl.max)
    sliderControlElement.setAttribute("max", sliderControl.max.toString());
  if (sliderControl.initialValue)
    sliderControlElement.setAttribute(
      "initial-value",
      sliderControl.initialValue.toString()
    );

  return sliderControlElement;
};

// TODO - These functions could definitly be cleaned up
const createToggleControl = (toggleControl: ToggleControl) => {
  const toggleControlElement = document.createElement(
    "toggle-button"
  ) as ToggleControlItem;
  toggleControlElement.setAttribute("label", toggleControl.ariaLabel);

  if (toggleControl.eventId)
    toggleControlElement.setAttribute("event-id", toggleControl.eventId);

  if (toggleControl.initialState)
    toggleControlElement.setAttribute(
      "initial-state",
      toggleControl.initialState.toString()
    );

  if (toggleControl.onText)
    toggleControlElement.setAttribute("on-text", toggleControl.onText);
  if (toggleControl.offText)
    toggleControlElement.setAttribute("off-text", toggleControl.offText);

  return toggleControlElement;
};

export const createControlPanelItem = (
  control: ToggleControl | SliderControl
) => {
  // Create Control Group Item
  const controlItem = document.createElement("control-panel-item");
  const label = document.createElement("div");
  label.id = "slot";
  label.slot = "label";
  label.innerHTML = control.label;
  controlItem.append(label);

  const controller = document.createElement("div");
  controller.id = "slot";
  controller.slot = "controller";

  // Append the correct controller
  let controlElement: SliderControlItem | ToggleControlItem;
  switch (control.type) {
    case "slider":
      controlElement = createSliderControl(control as SliderControl);
      break;
    case "toggle":
      controlElement = createToggleControl(control as ToggleControl);
      break;
    default:
      controlElement = createToggleControl(control as ToggleControl);
  }

  controller.append(controlElement as SliderControlItem | ToggleControlItem);
  controlItem.append(controller);
  return controlItem;
};
