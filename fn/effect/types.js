//@flow

import type {
    NullaryFn, UnaryFn, BinaryFn, TernaryFn, QuarternaryFn, QuinaryFn, SenaryFn
} from '../types'

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

export type After
    = After5 & After4 & After3 & After2 & After1 & After0

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

export type Before
    = Before5 & Before4 & Before3 & Before2 & Before1 & Before0

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

export type Trace
    = Trace5 & Trace4 & Trace3 & Trace2 & Trace1 & Trace0
