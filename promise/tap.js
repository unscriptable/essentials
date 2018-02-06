// Add a pure side effect to a promise handler.
// The result of the original handler is simply passed through.
export const tap
    = effect => x => {
        // squelch. side effect must handle its own errors
        try { effect(x) } catch (e) {}
        return x
    }

export const tapError
    = effect => err => {
        // squelch. side effect must handle its own errors
        try { effect(err) } catch (e) {}
        throw err
    }
