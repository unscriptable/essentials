// Convert a node-style function with a callback into a function that returns
// a promise.
export const promisify
    = f => (...x) =>
        new Promise((resolve, reject) =>
            f(...x, (err, result) => err ? reject(err) : resolve(result))
        )
