
export const domCollection
    = (container, childPrototype, push) => {
        // Remove childPrototype from document?
        // if (container.ownerDocument.contains(childPrototype))
        //     childPrototype.parentNode.removeChild(childPrototype)

        const create
            = data => {
                const child = childElement.cloneNode(true)
                return update(child, data)
            }

        const update
            = (child, data) => {
                push(child, data)
                return child
            }

        const insert
            = (pos, child) => {
                const sibling = container.children[pos] || null
                return container.insertBefore(child, sibling)
            }

        const remove
            = pos => {
                const child = container.children[pos]
                return child && container.removeChild(child)
            }

        return { create, insert, remove, update }
    }
