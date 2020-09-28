export const mapping = {
  '%Y': 'Y',
  '%y': 'y',
  '%C': 'Y',
  '%m': 'm',
  '%-m': 'n',
  '%_m': 'n',
  '%B': 'F',
  '%^B': 'F',
  '%b': 'M',
  '%^b': 'M',
  '%h': 'M',
  '%^h': 'M',
  '%d': 'd',
  '%-d': 'j',
  '%e': 'j',
  '%H': 'H',
  '%k': 'H',
  '%I': 'h',
  '%l': 'h',
  '%-l': 'h',
  '%P': 'K',
  '%p': 'K',
  '%M': 'i',
  '%S': 'S',
  '%A': 'l',
  '%a': 'D',
  '%w': 'w'
}

const strftimeRegex = new RegExp(
  Object.keys(mapping)
    .join('|')
    .replace(new RegExp('\\^', 'g'), '\\^'),
  'g'
)

export const convertDateFormat = (format) => {
  return format.replace(strftimeRegex, (match) => {
    return mapping[match]
  })
}
