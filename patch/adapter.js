// Adapts a patch function to work with "collections".
export const collection
    = {
        insert: (coll, item, key) => { coll[key] = item },
        remove: (coll, item, key) => { delete coll[key] },
        replace: (coll, prev, item, key) => { coll[key] = item }
    }

// Adapsts a patch function to work with arrays.
export const array
    = {
        insert: (array, item, index) => { array.splice(index, 0, item) },
        remove: (array, item, index) => { array.splice(index, 1) },
        replace: (array, prev, item, index) => { array[index] = item }
    }

// TODO: types for these
