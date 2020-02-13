// Function to spread an array of values onto a function's parameters.

export const spread
  = func => values =>
    func(...values)
