//@flow
// Functions to perform lazy async functions, aka "Lazy ops"

type LazyOp<T> = () => Promise<T>

// Convert any function into a lazy function.  A lazy function (e.g. `f`) takes
// some arguments (`f(1,2,3)`) and returns a function that takes zero arguments.
// Calling the returned function executes the original function with the given
// arguments.  Example:
// const add3 = (a, b, c) => a + b + c
// const lazyAdd3 = lazy(add3) // awaits arguments
// const lazyAdd123 = lazyAdd3(1, 2, 3) // addition not yet performed!
// console.log(lazyAdd123()) // addition performed and prints "6"
export const lazy
  : <F:Function>(F) => (...$Arguments<F>) => () => $Result<F>
  = eager => (...x) => () => eager(...x)

// Given a number of msec to wait, returns a lazy operation that does nothing
// but waits the given msec.
export const delay
  : number => () => Promise<void>
  = msec => () => new Promise(resolve => setTimeout(() => resolve(), msec))

// Given an array of lazy operations, sequences them to ensure that they run
// one at a time.
// Example:
// const allOps = sequenceAll([ op1, op2, op3 ])
export const sequenceAll
  : (Array<LazyOp<mixed>>) => LazyOp<mixed>
  = lazyOps => sequence(...lazyOps)

// Given one or more lazy operations as arguments, sequences them to ensure that
// they run one at a time.  Performance optimized for up to 4 arguments.
// Example:
// const allOps = sequence(op1, op2, op3)
export const sequence
  : (...Array<LazyOp<mixed>>) => LazyOp<mixed>
  = (...lazyOps) => {
    switch (lazyOps.length) {
      case  0: return () => Promise.resolve()
      case  1: return () => Promise.resolve(lazyOps[0]())
      case  2: return sequence2(lazyOps[0], lazyOps[1])
      case  3: return sequence3(lazyOps[0], lazyOps[1], lazyOps[2])
      case  4: return sequence4(lazyOps[0], lazyOps[1], lazyOps[2], lazyOps[3])
      default: return () =>
        lazyOps.reduce((prevP, op) => prevP.then(() => op()), Promise.resolve())
    }
  }

// Given two lazy operations, sequences them and resolves to the result of the
// last one.  Unlike `sequence` or `sequence`, this function preserves the type
// information of the last lazy operation.
export const sequence2
  : <T>(LazyOp<mixed>, LazyOp<T>) => LazyOp<T>
  = (op1, op2) => () =>
    Promise.resolve(op1())
      .then(() => (op2():any)) // why, flow, why?

// Given three lazy operations, sequences them and resolves to the result of the
// last one.  Unlike `sequence` or `sequence`, this function preserves the type
// information of the last lazy operation.
export const sequence3
  : <T>(LazyOp<mixed>, LazyOp<mixed>, LazyOp<T>) => LazyOp<T>
  = (op1, op2, op3) => () =>
    Promise.resolve(op1())
      .then(() => op2())
      .then(() => (op3():any)) // why, flow, why?

// Given four lazy operations, sequences them and resolves to the result of the
// last one.  Unlike `sequence` or `sequence`, this function preserves the type
// information of the last lazy operation.
export const sequence4
  : <T>(LazyOp<mixed>, LazyOp<mixed>, LazyOp<mixed>, LazyOp<T>) => LazyOp<T>
  = (op1, op2, op3, op4) => () =>
    Promise.resolve(op1())
      .then(() => op2())
      .then(() => op3())
      .then(() => (op4():any)) // why, flow, why?

// Flow seems to be missing thee very useful types.

type $Arguments<F>
  = $Call<<A:$ReadOnlyArray<mixed>>((...A) => mixed) => A, F>

type $Result<F>
  = $Call<<R>(() => R) => R, F>
