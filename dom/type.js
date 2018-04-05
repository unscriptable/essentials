// Functions to assert dom type safety
export const assertType
    = cls => el => {
        if (!(el instanceof cls))
          throw new Error(`Element "${String(el)}" is not a ${cls.name}.`)
        return el
    }
