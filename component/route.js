// functions for client-side routing

// TODO: design a hierarchical controller pattern
// path patterns are mapped to a hierarchy of controllers

export const pushState
    = path =>
        history.pushState(null, null, path)

export const onPopState
    = handle =>
        window.addEventListener(
            'popstate',
            e => handle(location.pathname + location.search + location.hash),
            false
        )

export const pushHash
    = path =>
        location.href = location.href.replace(/#.*?$/, `#${path}`)

export const onPopHash
    = handle =>
        window.addEventListener(
            'hashchange',
            e => handle(location.hash),
            false
        )

// A path can invoke more than one handler.  All matching handlers are invoked.
// routes look like this:
//  {
//      '/products/{id}': functionThatExpectsIdParam,
//      '/products': functionThatExpectsNoParams,
//      '/invoices/{num1}/lines/{num2}': controllerThatExpectsTwoParams,
//  }
const router
    = routes => {
        const matchers = routesToMatcherPairs(routes)
        return path =>
            matchers.forEach(
                ([match, handle]) => {
                    const params = match(path)
                    if (params) handle(params)
                }
            )
    }

const routesToMatcherPairs
  = routes =>
    Object.keys(routes).map(pattern => [pathMatcher(pattern), routes[pattern]])

const pathMatcher = pattern => {
        const { rx, names } = parsePattern(pattern)
        return path => {
            const matches = path.match(rx)
            return matches && matches.slice(1).reduce(
                (res, m, i) => (res[names[i]] = m, res),
                {}
            )
        }
    }

const parsePattern
    = pattern => {
        const names = []
        const rxString
            = pattern.replace(rxParse, (_, n) => (names.push(name), '(.*?)'))
        const rx = new RegExp(rxString)
        return { rx, names }
    }

const rxParse = /{([^}]+)}/g
