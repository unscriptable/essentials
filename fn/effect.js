// Strict side-effect advice (params and result) for functions -- a form of AOP.
// Errors are squelched, so advice errors must be explicitly handled.
// To capture errors, use the `failWith` function to wrap your effect.
// On the other hand, `tap` will let errors leak into the main flow, much like
// `tap` functions in promise chains.

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
// The `after` function receives `f`'s arguments and result as arguments,
// and its result (or exception) is ignored.
export const trace
    = (f, before, after) => (...x) => {
        try { before(...x) } catch (e) {}
        const result = f(...x)
        try { after(result, ...x) } catch (e) {}
        return result
    }

// Create a function that behaves like another function (`f`), but calls
// a side effect function before executing.  Unlike `before`, `tap` allows
// any errors thrown from the effect to leak into the main flow.
export const tap
    = effect => x =>
        (effect(x), x)

// Wrap a side-effect in a function that captures errors.
// A common pattern (TODO: think of a sync use case):
// const logErrors = failWith(console.error)
// after(saveToDb, logErrors(publish))
export const failWith
    = handle => effect => (...x) => {
        try { effect(...x) } catch (e) { handle(e) }
    }
