// Pure side effects for functions -- a form of AOP.
// Side effects are "pure" which means they cannot alter the normal flow
// of execution.  (Non-pure side effects can alter the normal flow by throwing
// errors.)  Pure side effects are useful when working with untrusted side-
// effect code, with code that throws unimportant or spurious errors, or with
// code that handles its own errors (for instance, it logs to a data store
// instead of the console/stdout).

// You can create side effects that handle their own errors with the `failWith`
// function.

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`after`) just before returning a result.
// The side-effect function receives `f`'s result and arguments,
// and its result (or exception) is ignored.
export const after
    = (f, effect) => (...x) => {
        const result = f(...x)
        try { effect(result, ...x) } catch (e) {}
        return result
    }

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing.
// The side-effect function receives `f`'s arguments as input,
// and its result (or exception) is ignored.
export const before
    = (f, effect) => (...x) => {
        try { effect(...x) } catch (e) {}
        return f(...x)
    }

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing and calls
// a second side-effect function (`after`) just before returning a result.
// The `before` function receives `f`'s arguments as input.
// The `after` function receives `f`'s result and arguments as arguments,
// and its result (or exception) is ignored.
export const trace
    = (f, before, after) => (...x) => {
        try { before(...x) } catch (e) {}
        const result = f(...x)
        try { after(result, ...x) } catch (e) {}
        return result
    }

// Create a side-effect function that captures and handles errors.
// For instance, when practicing "schema-on-read", instead of stopping the
// normal flow when input data isn't valid, you can log a warning instead:
// const logWarning = failWith(console.warn)
// after(processInput, logWarning(validateSchema))
export const failWith
    = handle => f => (...x) => {
        try { f(...x) } catch (e) { handle(e) }
    }
