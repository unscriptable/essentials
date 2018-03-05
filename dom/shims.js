// Returns a function that determines whether an element matches a CSS selector.
export const matches
    = () => {
        const proto = Element.prototype
        if (!proto.matches) proto.matches = proto.msMatchesSelector || _matches
    }

export const all
    = () => {
        matches()
    }

function _matches (s) {
    const matches = (this.document || this.ownerDocument).querySelectorAll(s)
    return Array.from(matches).some(el => el === this)
}
