// Dom traversal functions

export const querySelector
    = query => el => el.querySelector(query)

export const querySelectorAll
    = query => el => el.querySelectorAll(query)

export const closest
    = query => el => el.closest(query)

export const matches
    = query => el => el.matches(query)
