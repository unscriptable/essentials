//@flow
export { merge, replace, mergeClasses, mergeAttributes } from './merge'
export { render } from './render'

// TODO: node replication when data is an array or object
/*
1. Capture an element to be cloned
2. For each item in array (or object), render, bind, and insert an element
3. Don't overwrite existing elements
*/
