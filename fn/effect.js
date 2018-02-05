//@flow
// Strict side-effect advice (params and result) for functions -- a form of AOP.
// Errors are squelched, so advice errors must be explicitly handled.
// I copied these from other modules I've written over the years.

const _after : any
    = (f, effect) => (...x) => {
        const result = f(...x)
        try { effect(result, ...x) } catch (e) {}
        return result
    }

const _before : any
    = (f, effect) => (...x) => {
        try { effect(...x) } catch (e) {}
        return f(...x)
    }

const _trace : any
    = (f, before, after) => (...x) => {
        try { before(...x) } catch (e) {}
        const result = f(...x)
        try { after(result, ...x) } catch (e) {}
        return result
    }

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`after`) just before returning a result.
// The side-effect function receives `f`'s result and arguments,
// and its result (or exception) is ignored.
export const after : After = _after


// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing.
// The side-effect function receives `f`'s arguments as input,
// and its result (or exception) is ignored.
export const before : Before = _before

// Create a function that behaves exactly like another function (`f`),
// but calls a side-effect function (`before`) before executing and calls
// a second side-effect function (`after`) just before returning a result.
// The `before` function receives `f`'s arguments as input.
// The `after` function receives `f`'s arguments and result as arguments,
// and its result (or exception) is ignored.
export const trace : Trace = _trace

// -------------------- types --------------------

import type {
    NullaryFn, UnaryFn, BinaryFn, TernaryFn, QuarternaryFn, QuinaryFn, SenaryFn
} from './types'

type After0
    = <R>(f:NullaryFn<R>, effect:UnaryFn<R,any>) => NullaryFn<R>
type After1
    = <A,R>(f:UnaryFn<A,R>, effect:BinaryFn<A,R,any>) => UnaryFn<A,R>
type After2
    = <A,B,R>(f:BinaryFn<A,B,R>, effect:TernaryFn<A,B,R,any>) => BinaryFn<A,B,R>
type After3
    = <A,B,C,R>(f:TernaryFn<A,B,C,R>, effect:QuarternaryFn<A,B,C,R,any>) => TernaryFn<A,B,C,R>
type After4
    = <A,B,C,D,R>(f:QuarternaryFn<A,B,C,D,R>, effect:QuinaryFn<A,B,C,D,R,any>) => QuarternaryFn<A,B,C,D,R>
type After5
    = <A,B,C,D,E,R>(f:QuinaryFn<A,B,C,D,E,R>, effect:SenaryFn<A,B,C,D,E,R,any>) => QuinaryFn<A,B,C,D,E,R>

type After
    = After0 & After1 & After2 & After3 & After4 & After5

type Before0
    = <R>(f:NullaryFn<R>, effect:UnaryFn<R,any>) => NullaryFn<R>
type Before1
    = <A,R>(f:UnaryFn<A,R>, effect:BinaryFn<A,R,any>) => UnaryFn<A,R>
type Before2
    = <A,B,R>(f:BinaryFn<A,B,R>, effect:TernaryFn<A,B,R,any>) => BinaryFn<A,B,R>
type Before3
    = <A,B,C,R>(f:TernaryFn<A,B,C,R>, effect:QuarternaryFn<A,B,C,R,any>) => TernaryFn<A,B,C,R>
type Before4
    = <A,B,C,D,R>(f:QuarternaryFn<A,B,C,D,R>, effect:QuinaryFn<A,B,C,D,R,any>) => QuarternaryFn<A,B,C,D,R>
type Before5
    = <A,B,C,D,E,R>(f:QuinaryFn<A,B,C,D,E,R>, effect:SenaryFn<A,B,C,D,E,R,any>) => QuinaryFn<A,B,C,D,E,R>

type Before
    = Before0 & Before1 & Before2 & Before3 & Before4 & Before5

type Trace0
    = <R>(f:NullaryFn<R>, before:UnaryFn<R,any>, after:UnaryFn<R,any>) => NullaryFn<R>
type Trace1
    = <A,R>(f:UnaryFn<A,R>, before:BinaryFn<A,R,any>, after:BinaryFn<A,R,any>) => UnaryFn<A,R>
type Trace2
    = <A,B,R>(f:BinaryFn<A,B,R>, before:TernaryFn<A,B,R,any>, after:TernaryFn<A,B,R,any>) => BinaryFn<A,B,R>
type Trace3
    = <A,B,C,R>(f:TernaryFn<A,B,C,R>, before:QuarternaryFn<A,B,C,R,any>, after:QuarternaryFn<A,B,C,R,any>) => TernaryFn<A,B,C,R>
type Trace4
    = <A,B,C,D,R>(f:QuarternaryFn<A,B,C,D,R>, before:QuinaryFn<A,B,C,D,R,any>, after:QuinaryFn<A,B,C,D,R,any>) => QuarternaryFn<A,B,C,D,R>
type Trace5
    = <A,B,C,D,E,R>(f:QuinaryFn<A,B,C,D,E,R>, before:SenaryFn<A,B,C,D,E,R,any>, after:SenaryFn<A,B,C,D,E,R,any>) => QuinaryFn<A,B,C,D,E,R>

type Trace
    = Trace0 & Trace1 & Trace2 & Trace3 & Trace4 & Trace5
