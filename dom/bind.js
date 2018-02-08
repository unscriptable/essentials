// Data-binding functions

// We want to define the query to find the node, the attribute to mutate, and
// the transform to apply.  Do the latter two make sense to be combined?
// Actually, perhaps we want to tranform the data before binding?
export const bind
    = mappings => {
        const bindFuncs
            = mappings.map(
                ({ query, key, attr, prop }) => {
                    const setter = attr != null ? setAttr(attr) : setProp(prop)
                    return (el, data) =>
                        el.querySelectorAll(query).forEach(setter(data[key]))
                }
            )
        return el => data => bindFuncs.forEach(f => f(el, data))
    }

const setAttr
    = attr => value => el => el.setAttribute(attr, value)

const setProp
    = prop => value => el => el[prop] = value


// TODO: provide early and late binding
// TODO: check if the root node matches select via el.matches / el.msMatchesSelector

const bindEarly
    : BindSpecs => Element => Array<BindFunction>
    = mappings => el => {
        const bindFuncs
            = mappings.reduce(
                (funcs, { query, key, attr, prop }) => {
                    const children = [].slice.apply(el.querySelectorAll(query))
                    // TODO: add root node if it matches, too
                    const setters
                        = children.map(
                            child => attr
                                ? data => child.setAttribute(attr, data[key])
                                : data => child[prop] = data[key]
                        )
                    return funcs.concat(setters)
                }
            )
        return data => bindFuncs.forEach(f => f(data))
    }

const bindLate
    : BindSpecs => Element => Array<BindFunction>
    = mappings => {
        const bindFuncs
            = mappings.map(
                ({ query, key, attr, prop }) => {
                    const setter = attr != null ? setAttr(attr) : setProp(prop)
                    return (el, data) => {
                        // TODO: add root node if it matches, too
                        const children = [].slice.apply(el.querySelectorAll(query))
                        children.forEach(setter(data[key]))
                    }
                }
            )
        return el => data => bindFuncs.forEach(f => f(el, data))
    }
