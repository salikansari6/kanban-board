const dynamicGradient = (to: string, ...colors: string[]) => {
  if (colors.length === 1) {
    return `bg-gradient-to-${to} from-${colors[0]}-500 to-${colors[0]}-300`;
  } else if (colors.length === 2) {
    return `bg-gradient-to-${to} from-${colors[0]} to-${colors[1]}`;
  } else if (colors.length === 3) {
    return `bg-gradient-to-${to} from-${colors[0]} via-${colors[1]} to-${colors[2]}`;
  }
};

export default dynamicGradient;
