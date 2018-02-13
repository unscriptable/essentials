import { /*assert,*/AssertionError } from 'assert';

import { isString as _isString, nonblank } from './string';
import { isObject as _isObject, hasProp as _hasProp } from './object';
import { isNull as _isNull, isNotNull as _isNotNull, isStrictlyNull as _isStrictlyNull } from './null';

export const isString = _isString(AssertionError);
export const nonblankString = nonblank(AssertionError);
export const isObject = _isObject(AssertionError);
export const hasProp = _hasProp(AssertionError);