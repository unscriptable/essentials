// //
//
// // Functions for composing zero arity, promise-returning ("async") functions.
//
//
// // Create an async function that processes a series of async functions
// // in sequence, passing the result through the entire chain or rejecting
// // with the first rejection value.
// export const chained
//     = <T>(ops:Array<()=>Promise<T>>) => () =>
//         ops.reduce(
//             (prev, curr) => prev.then(curr),
//             Promise.resolve()
//         )
//
// // Create an async function that processes a series of async functions
// // all at once and returns an array of their resolved values or rejecting
// // with the first rejection value.
// export const blasted
//     = <T>(ops:Array<()=>Promise<T>>) => () =>
//         Promise.all(ops.map(op => op()))
//
// export const queued = emitted(1)
//
// // TODO: can we create an array of Promises for the results and then control the execution of the operations?
// // TODO: What do we do if one rejects?
// export const emitted =
//     (count:number) => <T>(ops:Array<()=>Promise<T>>) => {
//         const last = ops.length - 1
//         let inflight = 0
//         let next = 0
//         const results = new Array(ops.length)
//         const checkNext =
//             (resolve, reject) => {
//                 if (next > last) {
//                     resolve()
//                 }
//                 else if (inflight < count) {
//                     const op = ops[next]
//                     op().then(collect(next), fail)
//                     inflight++
//                     next++
//                 }
//             }
//         const collect = i => x => { --inflight; results[i] = x; return new Promise(checkNext) }
//         const fail = e => { --inflight; throw e }
//
//         if (isNaN(count) || count < 1) {
//             throw new Error(`Invalid count: ${ count }`)
//         }
//
//         return () => new Promise(checkNext).then(() => results)
//     }
//
// export const emitted2
//     = (count:number) => <T>(ops:Array<()=>Promise<T>>) => {
//         // Create a set of new ops (`waitingOps`) that call the original ops,
//         // resolve/reject promises for their values, then check to run
//         // another waitingOp:
//         const waitingOps = []
//         const last = ops.length - 1
//         let next = 0
//
//         // Run the next meta operation, if any, passing the value through.
//         const runNextOp = x => (next <= last && waitingOps[next++](), x)
//         const chainOp = op => () => op().then(runNextOp)
//         const saveOp = op => (waitingOps.push(op), op)
//
//         // Take an op and promise resolvers and push a "meta op" onto the list.
//         // TODO: this is the heart of the algorithm, but is so obtuse!
//         const waitingOp
//             = op => (resolve, reject) =>
//                 saveOp(() => op().then(resolve, reject).then(runNextOp))
//
//         // Create initial and waiting operations
//         const results
//             = ops.map(
//                 (op, i) =>
//                     i < count
//                         ? chainOp(op)
//                         : () => new Promise(waitingOp(op))
//             )
//
//         // Return promise for all results
//         return () => blasted(results)
//     }