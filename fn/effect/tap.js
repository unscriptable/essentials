// Side-effect advice for functions -- a form of AOP.
// Side effects are not "pure", which makes it easier to handle exceptions.
// If an error is thrown in a side effect, it shortcuts the normal flow of
// execution.  This behavior is similar to `tap()` in Promise implementations.

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`after`) just before returning a result.
// The side-effect function receives `f`'s result and arguments,
// and its result is ignored.
export const after
    = (f, effect) => (...x) => {
        const result = f(...x)
        effect(result, ...x)
        return result
    }

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing.
// The side-effect function receives `f`'s arguments as input,
// and its result is ignored.
export const before
    = (f, effect) => (...x) => {
        effect(...x)
        return f(...x)
    }

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing and calls
// a second side-effect function (`after`) just before returning a result.
// The `before` function receives `f`'s arguments as input.
// The `after` function receives `f`'s result and arguments as arguments.
// All side effect results are ignored.
export const trace
    = (f, before, after) => (...x) => {
        before(...x)
        const result = f(...x)
        after(result, ...x)
        return result
    }
