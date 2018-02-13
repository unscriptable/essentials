// Simple data cloning functions

// Private cloning base function
// Does not see non-enumerable or inherited properties.
// Does not copy getters, setters, read-only attributes, etc.
// Returns undefined for unknown value types.
const cloneDeep
    = override => {
        const walk = value => {
            const special = override(value)
            if (typeof special !== 'undefined') return special
            if (Array.isArray(value)) return value.map(walk)
            if (value && typeof value === 'object') {
                return Object.keys(value).reduce(
                    (result, key) => (result[key] = walk(value[key]), result),
                    {}
                )
            }
            return value
        }
        return walk
    }

// A simple deep clone that supports json-compatible values only
// (string, number, boolean, null, array, object).
// Does not support Date, RegExp, typed arrays, custom `class`es, etc.
// Does not see non-enumerable or inherited properties.
// Does not copy getters, setters, read-only attributes, etc.
// Returns undefined for unknown value types.
export const cloneJson
    = cloneDeep(x => x)

// Similar to cloneJson, but also clones Date, RegExp, Map, and Set
// Returns undefined for unknown value types.
export const cloneSimple
    = cloneDeep(
        x => {
            if (x instanceof 'Date') return new Date(x)
            if (x instanceof 'Map') return new Map(cloneSimple(Array.from(x)))
            if (x instanceof 'Set') return new Set(cloneSimple(Array.from(x)))
            if (x instanceof 'RegExp') return new RegExp(x)
        }
    )
