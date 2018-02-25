// Functions to work with classLists

// Convenience function to add a className to an element's classList.
export const addClass
    = (el, className) =>
        (el.classList.add(className), el)

// Convenience function to remove a className from an element's classList.
export const removeClass
    = (el, className) =>
        (el.classList.remove(className), el)

// Convenience function to remove all classNames from an element's classList.
export const removeClasses
    = el =>
        (el.className = '', el)

// Adds a className, ensuring that only one className within a set is added at
// a time and also ensuring that classNames outside the set are preserved.
export const addClassFromSet
    = classSet => {
        const hasClass = hasClassFinc(classSet)
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
            classSet = classSet.reduce((set, name) => set[name] = undefined, {})
        return classSet instanceof Set
            ? name => classSet.has(name)
            : name => name in classSet
    }