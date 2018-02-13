export const isString = E => s => {
    if (typeof s !== 'string') {
        throw new E(`"${JSON.stringify(s)}" is not a string`);
    }
    return s;
};

export const nonblank = E => key => s => {
    if (s.length === 0) {
        throw new E(`${key} must not be blank`);
    }
    return s;
};