//@flow
// A more semantically-named, variadic version of Promise.all.
export const concurrently
    : Concurrently
    = (...promises) => Promise.all(promises)

// A version of concurrently that takes an array of promises.
// This is essentially just an alias for Promise.all.
export const concurrentlyA
    : ConcurrentlyA
    = Promise.all

type Concurrently = <T: Iterable<mixed>>(...promises: T) => Promise<$TupleMap<T, typeof $await>>
type ConcurrentlyA = typeof Promise.all
