// Dom insertion functions

// Merges a source node onto a target node, replacing it along with merged
// attributes and classNames.
// Note: does *not* keep target's event handlers or javascript properties.
export const merge
    = (target, source) =>
        replace(target, mergeClasses(mergeAttributes(source, target), target))

// Replaces `target` node with `source` node.
export const replace
    = (target, source) =>
        target.parentNode.replaceChild(source, target)

// Merges class names from `source` element onto `target` element
export const mergeClasses
    = (target, source) => {
        target.classList.add(...source.classList)
        return target
    }

// Copies attributes from `source` element if they don't already exist on `target`.
export const mergeAttributes
    = (target, source) => {
        Array.from(source.attributes).forEach(
            attr => !target.hasAttribute(attr.name)
                && target.setAttribute(attr.name, attr.value)
        )
        return target
    }
