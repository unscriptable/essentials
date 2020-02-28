// Functions to use state repositories.

// Create a state repository.  Accepts a clone function, then an initial state.
// A state repository uses patterns much like a reduce function.  Repository
// functions store or retrieve state.  The storage operations are side-effects
// and pass the input value through to the output.  This makes them well suited
// to storing state in promise chains.  State is typically an object, but only
// the assign function requires state to be an object.  The merge and view
// function are generic.
//
// merge((currentState, value) => newState) - Provide a state mutation function
//   and get back an identity function.  The state mutation function must return
//   a new state, which is applied as a side effect.  In a promise chain, the
//   fulfillment value is passed through to the next `.then()`.
// assign(value => newProperties) - Provide a state mutation function and get
//   back an identity function.  The state mutation function must return an
//   object with properties that will be assigned to the state (which also must
//   be an object) as a side-effect.  In a promise chain, the fulfillment value
//   is passed through to the next `.then()`.
// view((currentState, value) => newValue) - Provide a function that will use
//   the final state.  The function is passed the state and the promise chain's
//   current fulfillment value and must return a value for the next `.then()`.
//   Note: unlike the other functions, view does not execute as a side effect.
//
// Example usage:
// const { merge, assign, view } = repo(cloneSimple, {})
// getX()
//   .then(merge((state, x) => ({ ...state, x })))
//   .then(transformToY) // receives x
//   .then(assign((_, y) => ({ y })))
//   .then(getZFromY) // receives y
//   .then(view(({ x, y }, z) => doSomething(x, y, z))
export const repo
  = clone => initialState => {
    let state = clone(initialState)

    const merge = f => value => ( state = clone(f(state, value)), value )
    const assign
      = f => value => ( state = { ...state, ...clone(f(value)) }, value )
    const view = f => value => f(clone(state), value)

    return { merge, assign, view }
  }
