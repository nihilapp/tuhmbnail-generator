export const getRGB = (hex: string, mode: ('r' | 'g' | 'b')) => {
  const hexExp = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/;
  const matchArray = hex.match(hexExp);

  if (mode === 'r') {
    return parseInt(matchArray[1], 16);
  } else if (mode === 'g') {
    return parseInt(matchArray[2], 16);
  } else {
    return parseInt(matchArray[3], 16);
  }
};
