//@flow

export {
    bind, bindStatic, setProp, unsetProp, setAttr, unsetAttr
} from './bind'

import {
    setClassNames as _setClassNames, unsetClassNames as _unsetClassNames
} from './bind'
import { addClass, removeClasses } from '../dom'

export const setClassName = _setClassNames(addClass)
export const unsetClassName = _unsetClassNames(removeClasses)
