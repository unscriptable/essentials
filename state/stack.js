// Functions to use state stacks.

// Create a state stack.  Accepts a clone function, then an initial item to put
// on the stack. The stack manages state by exposing stack-like functions.
// The push function mutates the stack as a side effect, returning the value
// stored on the stack.  A state stack is well-suited to promise chains where
// lots of items are accumulated and then required in a specific order.
//
// push(state) - Save a state item onto a stack.
// pop() - Remove and return the most recently pushed state item.
// items() - Return all of the state items as an array and empty the stack.
//
// Example usage:
// const { push, items } = stack(simpleClone)()
// getThing()
//   .then(push)
//   .then(getAnotherThing) // receives pushed item / result of getThing()
//   .then(push)
//   .then(items) // extracts all pushed items
//   .then(things => doSomething(...things))
//
// Example usage:
// const { push, items } = stack(simpleClone)()
// push(getThing())
//   .then(push(getAnotherThing)) // receives pushed item / result of getThing()
//   .then(items) // extracts all pushed items
//   .then(things => doSomething(...things))
export const stack
  = clone => initialState => {
    const stack = initialState !== undefined ? [clone(initialState)] : []

    const push = state => ( stack.push(clone(state)), state )
    const pop = () => stack.pop()
    const items = () => stack.splice(0)

    return { push, pop, items }
  }
