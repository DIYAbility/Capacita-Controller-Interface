let created = 0;

export const xbox = [
  { control: 'XboxLeftStick' },
];

export const ps4 = [];

function getValidDevice(value) {
  switch (value) {
    case 'ps4':
      return value;
    default:
      return 'xbox';
  }
}

function getValidView(value) {
  switch (value) {
    case 'simple':
    case 'wireframe':
      return value;
    default:
      return 'detailed';
  }
}

function getGrid(device) {
  switch (device) {
    case 'ps4':
      return ps4;
    default:
      return xbox;
  }
}

export default function template(options = {}) {
  const device = getValidDevice(options.device);
  return {
    name: options.name || `Untitled ${++created}`,
    device,
    view: getValidView(options.view),
    grid: getGrid(device),
  };
}
