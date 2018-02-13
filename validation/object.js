export const isObject = E => obj => {
    if (typeof obj !== 'object') {
        throw new E(`"${JSON.stringify(obj)}" is not an object`);
    }
    return obj;
};

// Validates a property exists and then retrieves it.
export const hasProp = E => key => obj => {
    if (!(key in obj)) {
        throw new E(`${key} is missing from ${JSON.stringify(obj)}`);
    }
    return obj[key];
};

const id = x => x;