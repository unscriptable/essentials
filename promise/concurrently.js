// A more semantically-named, variadic version of Promise.all.
export const concurrently
    = (...promises) => Promise.all(promises)

// A version of concurrently that takes an array of promises.
// This is essentially just an alias for Promise.all.
export const concurrentlyA
    = Promise.all
