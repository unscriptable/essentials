//@flow
export { merge, replace, mergeClasses, mergeAttributes } from './merge'
export {
    renderer, element as createElement, fragment as createFragment
} from './render'
export {
    addClass, removeClass, removeAllClasses, addClassFromSet
} from './classList'
export { matches, all } from './shims'
export { eventHandler, addEvent } from './event'
