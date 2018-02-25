//@flow

export {
    bind, bindStatic, setProp, unsetProp, setAttr, unsetAttr
} from './bind'

import {
    setClassNames as _setClassNames, unsetClassNames as _unsetClassNames
} from './bind'
import { addClass, removeAllClasses } from '../dom'

export const setClassNames = _setClassNames(addClass)
export const unsetClassNames = _unsetClassNames(removeAllClasses)
