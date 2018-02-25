// Functions to work with classLists

// Convenience function to add a className to an element's classList.
export const addClass
    = (el, className) => {
        Array.isArray(classNames)
            ? el.classList.add(...classNames)
            : el.classList.add(classNames)
        return el
    }

// Convenience function to remove a className from an element's classList.
export const removeClass
    = (el, className) => {
        Array.isArray(classNames)
            ? el.classList.remove(...classNames)
            : el.classList.remove(classNames)
        return el
    }

// Convenience function to remove all classNames from an element's classList.
export const removeAllClasses
    = el =>
        (el.className = '', el)

// Adds a className, ensuring that only one className within a set is added at
// a time and also ensuring that classNames outside the set are preserved.
export const addClassFromSet
    = classSet => {
        const hasClass = hasClassFunc(classSet)
        return (el, className) => {
            const { classList } = el
            classList.forEach(name => hasClass(name) && classList.remove(name))
            classList.add(className)
            return el
        }
    }

const hasClassFunc
    = classSet => {
        // Convert array to object
        if (Array.isArray(classSet))
            classSet = classSet.reduce((set, name) => (set[name] = undefined, set), {})
        return classSet instanceof Set
            ? name => classSet.has(name)
            : name => name in classSet
    }
