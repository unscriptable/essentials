//@flow

// Function composition functions.
// Compose up to five functions in _computational_ order.
// compose(f, g), compose(f, g, h), compose(f, g, h, j), compose(f, g, h, j, k)
// Create a function that composes two (or more) functions by the traditional
// definition of "function composition".  The last function can take
// several arguments, but the others can only take one.

// TODO: create a generic compose for over five functions
// TODO: composeRight / chain

const _compose2
    : any
    = (f, g) =>
        (...x) => f(g(...x))

const _compose3
    : any
    = (f, g, h) =>
        (...x) => f(g(h(...x)))

const _compose4
    : any
    = (f, g, h, j) =>
        (...x) => f(g(h(j(...x))))

const _compose5
    : any
    = (f, g, h, j, k) =>
        (...x) => f(g(h(j(k(...x)))))

// TODO: this is currently not accessible via the type system
const composeN
    = (f, ...gs) =>
        (...x) => gs.reduce((value, g) => g(value), f(...x))

const composers = [ x=>x, _compose2, _compose3, _compose4, _compose5 ]
const _compose
    : any
    = (f, ...gs) =>
        (composers[gs.length] || composeN)(f, ...gs)

export const compose2 : Compose2 = _compose2
export const compose3 : Compose3 = _compose3
export const compose4 : Compose4 = _compose4
export const compose5 : Compose5 = _compose5
export const compose : Compose = _compose

// -------------------- types --------------------

import type {
    UnaryFn, BinaryFn, TernaryFn, QuarternaryFn, QuinaryFn
} from './types'

type Compose2_1
    = <A1,I1,R>(f:UnaryFn<I1,R>, g:UnaryFn<A1,I1>) => UnaryFn<A1,R>
type Compose2_2
    = <A1,A2,I1,R>(f:UnaryFn<I1,R>, g:BinaryFn<A1,A2,I1>) => BinaryFn<A1,A2,R>
type Compose2_3
    = <A1,A2,A3,I1,R>(f:UnaryFn<I1,R>, g:TernaryFn<A1,A2,A3,I1>) => TernaryFn<A1,A2,A3,R>
type Compose2_4
    = <A1,A2,A3,A4,I1,R>(f:UnaryFn<I1,R>, g:QuarternaryFn<A1,A2,A3,A4,I1>) => QuarternaryFn<A1,A2,A3,A4,R>
type Compose2_5
    = <A1,A2,A3,A4,A5,I1,R>(f:UnaryFn<I1,R>, g:QuinaryFn<A1,A2,A3,A4,A5,I1>) => QuinaryFn<A1,A2,A3,A4,A5,R>
type Compose2 = Compose2_5 & Compose2_4 & Compose2_3 & Compose2_2 & Compose2_1

type Compose3_1
    = <A1,I1,I2,R>(f:UnaryFn<I2,R>, g:UnaryFn<I1,I2>, h:UnaryFn<A1,I1>) => UnaryFn<A1,R>
type Compose3_2
    = <A1,A2,I1,I2,R>(f:UnaryFn<I2,R>, g:UnaryFn<I1,I2>, h:BinaryFn<A1,A2,I1>) => BinaryFn<A1,A2,R>
type Compose3_3
    = <A1,A2,A3,I1,I2,R>(f:UnaryFn<I2,R>, g:UnaryFn<I1,I2>, h:BinaryFn<A1,A2,A3,I1>) => TernaryFn<A1,A2,A3,R>
type Compose3_4
    = <A1,A2,A3,A4,I1,I2,R>(f:UnaryFn<I2,R>, g:UnaryFn<I1,I2>, h:BinaryFn<A1,A2,A3,A4,I1>) => QuarternaryFn<A1,A2,A3,A4,R>
type Compose3_5
    = <A1,A2,A3,A4,A5,I1,I2,R>(f:UnaryFn<I2,R>, g:UnaryFn<I1,I2>, h:BinaryFn<A1,A2,A3,A4,A5,I1>) => QuinaryFn<A1,A2,A3,A4,A5,R>
type Compose3 = Compose3_5 & Compose3_4 & Compose3_3 & Compose3_2 & Compose3_1

type Compose4_1
    = <A1,I1,I2,I3,R>(f:UnaryFn<I3,R>, g:UnaryFn<I2,I3>, h:UnaryFn<I1,I2>, j:UnaryFn<A1,I1>) => UnaryFn<A1,R>
type Compose4_2
    = <A1,A2,I1,I2,I3,R>(f:UnaryFn<I3,R>, g:UnaryFn<I2,I3>, h:UnaryFn<I1,I2>, j:UnaryFn<A1,A2,I1>) => BinaryFn<A1,A2,R>
type Compose4_3
    = <A1,A2,A3,I1,I2,I3,R>(f:UnaryFn<I3,R>, g:UnaryFn<I2,I3>, h:UnaryFn<I1,I2>, j:UnaryFn<A1,A2,A3,I1>) => TernaryFn<A1,A2,A3,R>
type Compose4_4
    = <A1,A2,A3,A4,I1,I2,I3,R>(f:UnaryFn<I3,R>, g:UnaryFn<I2,I3>, h:UnaryFn<I1,I2>, j:UnaryFn<A1,A2,A3,A4,I1>) => QuarternaryFn<A1,A2,A3,A4,R>
type Compose4_5
    = <A1,A2,A3,A4,A5,I1,I2,I3,R>(f:UnaryFn<I3,R>, g:UnaryFn<I2,I3>, h:UnaryFn<I1,I2>, j:UnaryFn<A1,A2,A3,A4,A5,I1>) => QuinaryFn<A1,A2,A3,A4,A5,R>
type Compose4 = Compose4_5 & Compose4_4 & Compose4_3 & Compose4_2 & Compose4_1

type Compose5_1
    = <A1,I1,I2,I3,I4,R>(f:UnaryFn<I4,R>, g:UnaryFn<I3,I4>, h:UnaryFn<I2,I3>, j:UnaryFn<I1,I2>, k:UnaryFn<A1,I1>) => UnaryFn<A1,R>
type Compose5_2
    = <A1,A2,I1,I2,I3,I4,R>(f:UnaryFn<I4,R>, g:UnaryFn<I3,I4>, h:UnaryFn<I2,I3>, j:UnaryFn<I1,I2>, k:UnaryFn<A1,A2,I1>) => BinaryFn<A1,A2,R>
type Compose5_3
    = <A1,A2,A3,I1,I2,I3,I4,R>(f:UnaryFn<I4,R>, g:UnaryFn<I3,I4>, h:UnaryFn<I2,I3>, j:UnaryFn<I1,I2>, k:UnaryFn<A1,A2,A3,I1>) => TernaryFn<A1,A2,A3,R>
type Compose5_4
    = <A1,A2,A3,A4,I1,I2,I3,I4,R>(f:UnaryFn<I4,R>, g:UnaryFn<I3,I4>, h:UnaryFn<I2,I3>, j:UnaryFn<I1,I2>, k:UnaryFn<A1,A2,A3,A4,I1>) => QuarternaryFn<A1,A2,A3,A4,R>
type Compose5_5
    = <A1,A2,A3,A4,A5,I1,I2,I3,I4,R>(f:UnaryFn<I4,R>, g:UnaryFn<I3,I4>, h:UnaryFn<I2,I3>, j:UnaryFn<I1,I2>, k:UnaryFn<A1,A2,A3,A4,A5,I1>) => QuarternaryFn<A1,A2,A3,A4,A5,R>
type Compose5 = Compose5_5 & Compose5_4 & Compose5_3 & Compose5_2 & Compose5_1

type Compose
    = Compose5_5 & Compose5_4 & Compose5_3 & Compose5_2 & Compose5_1
    & Compose4_5 & Compose4_4 & Compose4_3 & Compose4_2 & Compose4_1
    & Compose3_5 & Compose3_4 & Compose3_3 & Compose3_2 & Compose3_1
    & Compose2_5 & Compose2_4 & Compose2_3 & Compose2_2 & Compose2_1
