// TODO: build a work-around for lack of :scope selector in IE/opera
export const bind
    = (containerEl, bindings) => {
        const push = dataPusher(bindings)
        return data => push(containerEl, data)
    }

export const bindStatic
    = (containerEl, bindings) => {
        const push = dataPusher(bindings, false)
        return data => push(containerEl, data)
    }

export const updater
    = bindings =>
        dataPusher(bindings, true)

const dataPusher
    = (bindings, dynamic) => {
        const binders
            = Object.keys(bindings).reduce(
                (result, key) => {
                    result[key] = createBinder(key, bindings[key], dynamic)
                    return result
                },
                {}
            )
        return (containerEl, data) => {
            Object.keys(data).forEach(
                key => {
                    if (key in binders) binders[key](containerEl, data[key])
                }
            )
        }
    }

const createBinder
    = (key, bindings, dynamic) => {
        const override = overrideDynamic(dynamic)
        if (!Array.isArray(bindings))
            return domUpdater(override(bindings))
        const updates
            = bindings.map(binding => domUpdater(override(binding)))
        return (containerEl, value) => {
            updates.forEach(update => update(containerEl, value))
        }
    }

const overrideDynamic
    = dynamic =>
        typeof dynamic !== 'undefined'
            ? binding => Object.assign({}, binding, { dynamic })
            : binding => binding

const domUpdater
    = ({ query, attr, prop, setter, dynamic=true }) => {
        const set = setter || (attr != null ? setAttr(attr) : setProp(prop))
        const unset = setter || (attr != null ? unsetAttr(attr) : unsetProp(prop))
        const elements = dynamic ? querySnapshot(query) : queryOnce(query)
        return (containerEl, value) =>
            containerEl.querySelectorAll(query)
                .map(value === null ? set : unset)
                .forEach(f => f(value))
    }

export const setProp
    : string => SetOperation<Element>
    = name => el => value =>
        (el[name] = value, el)

export const unsetProp
    : string => UnsetOperation<Element>
    = name => el => () =>
        (el[name] = undefined, el)

export const setAttr
    : string => SetOperation<Element>
    = name => el => value =>
        (el.setAttribute(name, String(value)), el)

export const unsetAttr
    : string => UnsetOperation<Element>
    = name => el => () =>
        (el.removeAttribute(name), el)


const querySnapshot
    = query => containerEl => Array.from(containerEl.querySelectorAll(query))

const queryOnce
    = query => {
        let snapshot
        return containerEl =>
            snapshot || (snapshot = querySnapshot(query)(containerEl))
    }
