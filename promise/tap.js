// Add a pure side effect to a promise handler.
// The result of the original handler is simply passed through.
export const tap
    = effect => x =>
        Promise.resolve(x)
            .then(effect)
            .then(() => x)

export const tapError
    = effect => err =>
        Promise.resolve(err)
        .then(effect)
        .then(() => Promise.reject(err))
