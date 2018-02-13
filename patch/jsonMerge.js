
// Employes the JSON Merge Patch algorithm to patch an object.
// See RFC 7396 (https://tools.ietf.org/html/rfc7396).
export const jsonMerge
    = clone => (item, patch) =>
        merge(clone(item), patch)

// Extends the JSON Merge Patch algorithm to work on HashMaps of objects or
// arrays of objects.  Only one level of hashmaps/arrays is supported.
// Think of this as a way to merge a collection of patches into a collection
// of objects.
export const jsonMergeCollection
    = clone => ({ insert, remove, replace }) => {
        const merge = jsonMerge(clone)
        return (collection, patches) => { // these are both collections, or both arrays
            return Object.keys(patches).reduce(
                (result, key) => {
                    const patch = patches[key]
                    const item = collection[key]
                    if (patch == null)
                        remove(result, item, key)
                    else if (key in collection)
                        replace(result, item, merge(item, patch), key)
                    else
                        insert(result, patch, key)
                    return result
                },
                clone(collection)
            )
        }
    }

// Adapts a patch function to work with hashMaps.
export const hashMapAdapter
    = {
        insert: (coll, item, key) => { coll[key] = item },
        remove: (coll, item, key) => { delete coll[key] },
        replace: (coll, prev, item, key) => { coll[key] = item }
    }

// Adapsts a patch function to work with arrays.
export const arrayAdapter
    = {
        insert: (array, item, index) => { array.splice(index, 0, item) },
        remove: (array, item, index) => { array.splice(index, 1) },
        replace: (array, prev, item, index) => { array[index] = item }
    }

// Core merge algorithm.
const merge
    = (target, patch) => {
        // Only try to recursively merge strict objects
        if (!isStrictObject(patch))
            return patch
        return Object.keys(patch).reduce(
            (result, key) => {
                const patchValue = patch[key]
                if (patchValue == null)
                    delete result[key]
                else {
                    result[key] = merge(result[key], patchValue)
                }
                return result
            },
            // This is in RFC 7396.
            isStrictObject(target) ? target : {}
        )
    }

const ObjectToString = Object.prototype.toString
const isStrictObject
    = it => ObjectToString.apply(it) === '[object Object]'
