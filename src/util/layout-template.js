let created = 0;

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
  return {
    ps4: [],
    xbox: [],
  };
  // switch (device) {
  //   case 'ps4':
  //     return ps4;
  //   default:
  //     return {};
  // }
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
