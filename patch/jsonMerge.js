
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

const merge
    = (target, patch) => {
        // Only try to recursively merge strict objects
        if (Object.prototype.toString.apply(patch) !== '[object Object]')
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
            typeof target !== 'object' ? target : {}
        )
    }
