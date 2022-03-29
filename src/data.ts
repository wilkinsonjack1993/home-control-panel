interface BaseControl {
  type: "toggle" | "slider";
  label: string;
  ariaLabel: string;
  eventId: string;
}

export interface ToggleControl extends BaseControl {
  onText?: string;
  offText?: string;
  initialState?: boolean;
}

export interface SliderControl extends BaseControl {
  min?: number;
  max?: number;
  initialValue?: number;
}

export interface ControlGroup {
  title: string;
  controls: (ToggleControl | SliderControl)[];
}

export const HOUSE_CONTROLS: ControlGroup[] = [
  {
    title: "Lights",
    controls: [
      {
        type: "toggle",
        label: "Sitting room",
        ariaLabel: "Sitting room lights",
        initialState: true,
        onText: "On",
        offText: "Off",
        eventId: "sitting-room-lights-toggled",
      },
      {
        type: "slider",
        label: "Bedroom",
        ariaLabel: "Bedroom lights",
        initialValue: 0,
        eventId: "bedroom-lights-changed",
      },
      {
        type: "toggle",
        label: "Kitchen",
        ariaLabel: "Kitchen lights",
        initialState: false,
        onText: "On",
        offText: "Off",
        eventId: "kitchen-lights-toggled",
      },
    ],
  },

  {
    title: "Other Devices",
    controls: [
      {
        type: "toggle",
        label: "Curtains",
        ariaLabel: "Open/close curtains",
        initialState: true,
        onText: "Open",
        offText: "Close",
        eventId: "curtains-opened-or-closed",
      },
      {
        type: "slider",
        label: "Thermostat",
        ariaLabel: "Thermostat",
        initialValue: 18,
        eventId: "thermostat-changed",
        max: 36,
      },
      {
        type: "toggle",
        label: "Garden Sprinklers",
        ariaLabel: "Garden sprinklers",
        initialState: false,
        onText: "On",
        offText: "Off",
        eventId: "garden-sprinklers-toggled",
      },
    ],
  },
];
