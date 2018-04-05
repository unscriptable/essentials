//@flow

export const domCollection
    : CreateAdapter<Object,Element,Element>
    = (container, childPrototype, _update) => {

        const create
            = data => {
                const child = childPrototype.cloneNode(true)
                return (update(child, data):any)
            }

        const update
            = (child, data) => {
                _update(child, data)
                return (child:any)
            }

        const insert
            = (pos, child) => {
                const sibling = container.children[pos] || null
                return (container.insertBefore(child, sibling):any)
            }

        const remove
            = pos => {
                const child = container.children[pos]
                return (child && container.removeChild(child):any)
            }

        return { create, insert, remove, update }
    }

type Adapter<T,E>
    = {
        create: T => E,
        insert: (number, E) => E,
        remove: number => ?E,
        update: (E, T) => E
    }
type CreateAdapter<T,E,P>
    = (P, E, (E,T)=>any) => Adapter<T,E>
