

// // Convert a node-style object method into a promisified one.
// export const promisifyMethod
//     : <T>(method:(cb:NodeCallback<T>)=>mixed) => () => Promise<T>
//     = method =>
//         function (...args) {
//             return new Promise(methodRunner(method, this)(args))
//         }
//
// export const promisifyMethod1
//     = <A,T>(method:(a:A,cb:NodeCallback<T>)=>mixed) =>
//         function (a:A) {
//             return new Promise(
//                 (rs, rj) => {
//                     const callback = (err, val) => err ? rj(err) : rs(val)
//                     method.call(this, a, callback)
//                 }
//             )
//         }
//
// export const promisifyMethod2
//     = <A,B,T>(method:(a:A,b:B,cb:NodeCallback<T>)=>mixed) =>
//         function (a:A, b:B) {
//             return new Promise(
//                 (rs, rj) => {
//                     const callback = (err, val) => err ? rj(err) : rs(val)
//                     method.call(this, a, b, callback)
//                 }
//             )
//         }
//
// type P3<A,B,C,T> = (method:(a:A,b:B,c:C,cb:NodeCallback<T>)=>mixed) => Promise<T>
// export const promisifyMethod3
//     : P3<*>
//     = method =>
//         function (a:A, b:B, c:C) {
//             return new Promise(
//                 (rs, rj) => {
//                     const callback = (err, val) => err ? rj(err) : rs(val)
//                     method.call(this, a, b, c, callback)
//                 }
//             )
//         }
//
// type NodeCallback<T> = (err:mixed, val:T) => mixed
//
// const func = (x:number,y:number,z:number,f:NodeCallback<string>):mixed =>
//     f(null,x*y*z+'foo')
// const funcP = promisifyMethod3(func)
// funcP(1,2,3)
// // promisifyMethod3((x:number,y:number,z:number,f:Function):string=>f(x*y*z+'foo'))(3,4,5)
//
// // Creates a promise resolver that runs a node callback function with the given
// // context and arguments.
// const methodRunner
//     = (f:Function, ctx) => args => (resolve, reject) => {
//         const callback = (err, result) => err ? reject(err) : resolve(result)
//         switch (args.length) {
//             case 0: return f.call(ctx, callback)
//             case 1: return f.call(ctx, args[0], callback)
//             case 2: return f.call(ctx, args[0], args[1], callback)
//             case 3: return f.call(ctx, args[0], args[1], args[2], callback)
//             case 4: return f.call(ctx, args[0], args[1], args[2], args[3], callback)
//             case 5: return f.call(ctx, args[0], args[1], args[2], args[3], args[4], callback)
//             default: return f.apply(ctx, args.concat(callback))
//         }
//     }
//
// type Arity0<Arity:0,T> = () => T
// type Arity1<A,T> = (A) => T
// type Arity2<A,B,T> = (A, B) => T
// type Arity3<A,B,C,T> = (A, B, C) => T
//
// type PromisifiableFunction<A,B,C,T>
//     = Arity0<T>
//     | Arity1<A,T>
//     | Arity2<A,B,T>
//     | Arity3<A,B,C,T>