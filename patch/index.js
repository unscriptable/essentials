// Patch operations based on json-merge-patch
export const patchElement
    = (set, unset) => (el) => {
        const setEl = set(el)
        const unsetEl = unset(el)
        return (key) => (data) =>
            key in data
                ? data[key] === null ? unsetEl() : setEl(data[key])
                : el
    }

export const setProp
    : string => SetOperation<Element>
    = name => el => value =>
        (el[name] = value, el)

export const unsetProp
    : string => UnsetOperation<Element>
    = name => el => () =>
        (el[name] = undefined, el)
