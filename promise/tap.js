// Add a side effect to a promise handler.
// The result of the original handler is simply passed through.
// If the effect rejects, the promise chain will also reject.
// To prevent the effect from rejecting, wrap the effect in a try-catch,
// which can be done with `failWith` (fn module).
export const tap
    = effect => x =>
        Promise.resolve(x)
            .then(effect)
            .then(() => x)

// Add a side effect to a rejection handler.
// If the effect rejects, the promise chain will reject with the effect's
// rejection value, losing the original rejection value.
// To prevent the effect from rejecting, wrap the effect in a try-catch,
// which can be done with `failWith` (fn module).
export const tapError
    = effect => err =>
        Promise.resolve(err)
        .then(effect)
        .then(() => Promise.reject(err))
