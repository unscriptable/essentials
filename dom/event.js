// Returns a pair of functions to add or remove an event.
export const eventHandler
    = (type, handle, useCapture=false) => (el, query=null) => {
        const maybeHandle
            = query
                ? event => event.target.matches(query) && handle(event)
                : handle
        return {
            add: () => el.addEventListener(type, maybeHandle, useCapture),
            remove: () => el.removeEventListener(type, maybeHandle, useCapture)
        }
    }

export const addEvent
    = (el, type, handle, query=null, useCapture=false) => {
        const { add, remove } = eventHandler(type, handle, useCapture)(el, query)
        add()
        return remove
    }

export const squelch = event => event.preventDefault()

export const target = event => event.target
