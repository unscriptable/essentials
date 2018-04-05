//@flow
export { merge, replace, mergeClasses, mergeAttributes } from './merge'
export {
    renderer, element as createElement, fragment as createFragment
} from './render'
export {
    addClass, removeClass, removeAllClasses, addClassFromSet
} from './classList'
export { all } from './shims'
export { eventHandler, addEvent, target, squelch } from './event'
export { querySelector, querySelectorAll, closest, matches } from './query'
export { assertType } from './type'
