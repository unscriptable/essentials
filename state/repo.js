// Functions to use state repositories.

// Create a state repository.  Accepts a clone function, then an initial state.
// A state repository uses patterns much like a reduce function.  Repository
// functions produce functions that store or retrieve state as side-effects
// and pass the input value through to the output.  This makes them well suited
// to storing state in promise chains.  State is typically an object.
// merge((currentState, value) => newState) - Provide a state mutation function
//   (accepts the current state and a value and returns a new state) and get
//   back an identity function (passes the input through to the output) that
//   saves the state returned from the state mutation function as a side effect.
// assign((currentState, value) => newProperties) - Provide a state mutation
//   function (accepts the current state and a value and returns new properties)
//   and get back an identity function (passes the input through to the output)
//   that saves new state properties returned from the state mutation function
//   as a side effect.
// view((currentState, value) => f(currentState, value)) - Works like merge,
//   but the provided function doesn't mutate the state.
// Example usage:
// const { merge, view } = repo(cloneSimple, {})
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
      = f => value => ( state = { ...state, ...clone(f(state, value)) }, value )
    const view = f => value => f(clone(state), value)

    return { merge, view }
  }
