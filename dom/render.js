// Functions to render html to dom nodes

// Given a document, returns a render function.
// Render function takes valid HTML and returns an element or elements.
export const renderer
    = document => {
        const templateElement = document.createElement('template')
        return "content" in templateElement
            ? html5Render(templateElement)
            : legacyRender(document)
    }

export const element
  = render => template => {
    const el = render(template).firstElementChild
    if (!el) throw new Error('Template did not render an element.')
    return el
  }

export const fragment
  = render => template => {
    const els = render(template).children
    if (els.length === 0) throw new Error('Template did not render elements.')
    return els
  }

// Creates a chain of parent elements required for the requested type
// (nodeName), returning the immediate parent to the requested type.
// Returns null if there is no special parent needed.
export const strictParent
    = nodeName => {
        const parentType = parentTypes[nodeName] || null
        const parent = parentType && document.createElement(parentType) //@flow-ignore
        const grandparent = parent && strictParent(parentType) //@flow-ignore
        return grandparent ? grandparent.appendChild(parent) : parent
    }

// Given an "html5" template element, returns a modern render function.
const html5Render
    = templateElement => template => {
        templateElement.innerHTML = template
        return templateElement.content
    }

// Given a document, returns a legacy render function.
const legacyRender
    = document => template => {
        const tagName = getFirstTagName(template)
        const container = strictParent(tagName) || document.createElement('div')
        container.innerHTML = template
        return container
    }

const getFirstTagNameRx = /<\s*(\w+)/

const getFirstTagName
    = template => {
        const matches = template.match(getFirstTagNameRx)
        const tagName = matches && matches[1]
        if (!tagName)
            throw new Error(`Could not parse tag in ${template}`)
        return tagName.toLowerCase()
    }

const parentTypes
    = {
        dd: 'dl',
        dt: 'dl',
        li: 'ul',
        td: 'tr',
        th: 'tr',
        tr: 'tbody',
        tbody: 'table',
        thead: 'table',
        tfoot: 'table',
        caption: 'table',
        option: 'select',
        optGroup: 'select',
        col: 'table',
        colgroup: 'table',
        option: 'select'
    }
