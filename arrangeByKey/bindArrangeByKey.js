import {arrangeByKey} from './arrangeByKey'
import {isNullOrEmpty} from '../isNullOrEmpty/isNullOrEmpty';

const arrangeByKeyWrapper = (bindKey, arr) => (
    // Disallow invalid binds - so default key is used by original function
    isNullOrEmpty(bindKey) ? arrangeByKey(arr) : arrangeByKey(arr, bindKey)
)

export const bindArrangeByKey = (bindKey) => arrangeByKeyWrapper.bind(null, bindKey)
