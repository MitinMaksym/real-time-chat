import tinycolor from "tinycolor2";

const getCorrectIndex = index => {
  return index.charCodeAt(0) > 255
    ? 255
    : index.charCodeAt(0) < 0
    ? 0
    : index.charCodeAt(0);
};

const createAvatarFromHash = hash => {
  const [r, g, b] = hash
    .substr(11, 14)
    .split("")
    .map(item => {
      return getCorrectIndex(item);
    });
  return {
    color: tinycolor({ r, g, b })
      .lighten(10)
      .saturate(15)
      .toHexString(),
    colorLighten: tinycolor({ r, g, b })
      .lighten(30)
      .saturate(30)
      .toHexString()
  };
};

export default createAvatarFromHash;
