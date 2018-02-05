//@flow

// Common function types

export type NullaryFn<R> = () => R
export type UnaryFn<A,R> = A => R
export type BinaryFn<A,B,R> = (A,B) => R
export type TernaryFn<A,B,C,R> = (A,B,C) => R
export type QuarternaryFn<A,B,C,D,R> = (A,B,C,D) => R
export type QuinaryFn<A,B,C,D,E,R> = (A,B,C,D,E) => R
export type SenaryFn<A,B,C,D,E,F,R> = (A,B,C,D,E,F) => R
