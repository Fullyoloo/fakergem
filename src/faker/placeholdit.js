const SUPPORTED_FORMATS = ['png', 'jpg', 'gif', 'jpeg'];

export function image(size='300x300', format='png', backgroundColor=null, textColor=null, text=null) {
  if (!isValidSize(size)) {
    throw new Error('Size should be specified in format 300x300');
  }
  if (!isSupportedFormat(format)) {
    throw new Error(`Supported formats are ${SUPPORTED_FORMATS.join(', ')}`);
  }
  if (!isValidColorValue(backgroundColor)) {
    throw new Error("backgroundColor must be a hex value without '#'");
  }
  if (!isValidColorValue(textColor)) {
    throw new Error("textColor must be a hex value without '#'");
  }

  let url = `https://placehold.it/${size}.${format}`;
  if (backgroundColor) {
    url += `/${backgroundColor}`;
  }
  if (textColor) {
    url += `/${textColor}`;
  }
  if (text) {
    url += `?text=${text}`;
  }
  return url;
}

function isValidSize(size) {
  return /^\d+x\d+$/.test(size);
}

function isSupportedFormat(format) {
  return SUPPORTED_FORMATS.includes(format);
}

function isValidColorValue(color) {
  if (color) {
    return new RegExp(/(?:^[0-9a-f]{3}$)|(?:^[0-9a-f]{6}$)/.source, 'i').test(color);
  }
  return true;
}