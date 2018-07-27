const strftimeRegex = /\%[a-zA-Z]/;

export const convertDateFormat = format => {
  const isStrftime = strftimeRegex.test(format);
  if (isStrftime) {
    let newFormat = format;
    Object.keys(mapping).forEach(token => {
      newFormat = newFormat.replace(RegExp(token, "g"), mapping[token]);
    });
    return newFormat;
  } else {
    return format;
  }
};

const mapping = {
  "%Y": "Y",
  "%y": "y",
  "%C": "Y",
  "%m": "m",
  "%-m": "n",
  "%_m": "n",
  "%B": "F",
  "%^B": "F",
  "%b": "M",
  "%^b": "M",
  "%h": "M",
  "%^h": "M",
  "%d": "d",
  "%-d": "j",
  "%e": "j",
  "%H": "H",
  "%k": "H",
  "%I": "h",
  "%l": "h",
  "%P": "K",
  "%p": "K",
  "%M": "i",
  "%S": "S",
  "%A": "l",
  "%a": "D",
  "%w": "w"
};

// export default convertDateFormat;
