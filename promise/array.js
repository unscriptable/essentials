// Functions to work with arrays in promise chains.

export const map
  = func => values =>
    Promise.all(values.map(func))
