//@flow

// Add a pure side effect to a promise handler.
// The result of the original handler is simply passed through.
const _tap : any
    = effect => x => {
        // squelch. side effect must handle its own errors
        try { effect(x) } catch (e) {}
        return x
    }

const _tapError : any
    = effect => err => {
        // squelch. side effect must handle its own errors
        try { effect(err) } catch (e) {}
        throw err
    }

export const tap : Tap = _tap

export const tapError : TapError = _tapError

type Tap = <A>(A=>any) => Identity<A>
type TapError = <A:Error>(A=>any) => Identity<A>
type Identity<A> = A => A
