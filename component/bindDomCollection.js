//@flow

type KeyFunc<T> = T => string

type Compare<T> = (T,T) => -1|0|1

type CollectionBinder<T:Object> =
    {
        // TODO: remove Functions
        patch: Function,
        reset: Function,
        sort: Function // Compare<T> => void
    }

export const bindDomCollection
// TODO: remove anys
    : <T:Object>($Keys<T>|KeyFunc<T>, $Keys<T>|Compare<T>, any, any) => CollectionBinder<T>
    = (key, sort, patcher, domCollection) => {
        // Prepare data structure and data functions
        // TODO: use a more performant data structure
        const itemArray = []
        if (typeof key === 'string') key = keyFunc(key)
        if (typeof sort === 'string') sort = compare(sort)
        const currentPos = findPosByKey(key, itemArray)
        const insertPos = findInsertPos(sort, itemArray)

        // Dom-data coordination functions
        const insert
            = (pos, item) => {
                // TODO: throw if pos out of bounds
                domCollection.insert(pos, domCollection.create(item))
                itemArray.splice(pos, 0, item)
            }
        const remove
            = pos => {
                // TODO: throw if pos out of bounds
                const el = domCollection.remove(pos)
                itemArray.splice(pos, 1)
                return el
            }
        const update
            = (oldPos, newPos, item) => {
                // TODO: throw if oldPos, newPos out of bounds
                const el = remove(oldPos)
                domCollection.insert(newPos, domCollection.update(el, item))
            }

        // Adapt patching mechanism
        const patchItems = patcher(
            {
                insert: (_, item, key) =>
                    insert(insertPos(item), item),
                remove: (_, item, key) =>
                    remove(currentPos(key)),
                replace: (_, prev, item, key) =>
                    update(currentPos(key), insertPos(item), item)
            }
        )

        // Return patch and reset functions
        return {
            patch: (itemCollection, patches) => {
                return patchItems(itemCollection, patches)
            },
            reset: newCollection => {
                // TODO
                return newCollection
            },
            sort: newSort => {
                // TODO
            }
        }
    }

const keyFunc
    = key => item => item[key]

const compare
    = sortByField => (item1, item2) => {
        const field1 = item1[sortByField]
        const field2 = item2[sortByField]
        return field1 > field2 ? -1 : field1 < field2 ? 1 : 0
    }

const findPosByKey
    = (keyFunc, items) => key => items.findIndex(item => keyFunc(item) === key)
const findInsertPos
    = (compare, items) => item => items.findIndex(u => compare(u, item) === 1)
