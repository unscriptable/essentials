// Function composition functions.
// Compose up to five functions in _computational_ order.
// compose(f, g), compose(f, g, h), compose(f, g, h, j), compose(f, g, h, j, k)
// Create a function that composes two (or more) functions by the traditional
// definition of "function composition".  The last function can take
// several arguments, but the others can only take one.

// TODO: create a generic compose for over five functions
// TODO: composeRight / chain

export const compose2
    = (f, g) =>
        (...x) => f(g(...x))

export const compose3
    = (f, g, h) =>
        (...x) => f(g(h(...x)))

export const compose4
    = (f, g, h, j) =>
        (...x) => f(g(h(j(...x))))

export const compose5
    = (f, g, h, j, k) =>
        (...x) => f(g(h(j(k(...x)))))

export const compose
    : any
    = (f, ...gs) =>
        (composers[gs.length] || composeN)(f, ...gs)

const composeN
    = (f, ...gs) =>
        (...x) => gs.reduce((value, g) => g(value), f(...x))

const composers = [ x=>x, _compose2, _compose3, _compose4, _compose5 ]
