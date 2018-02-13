export const isNull = E => key => x => {
    if (x != null) {
        throw new E(`${key} is not null or undefined`);
    }
    return x;
};

export const isNotNull = E => key => x => {
    if (x == null) {
        throw new E(`${key} is null or undefined`);
    }
    return x;
};

export const isStrictlyNull = E => key => x => {
    if (x !== null) {
        throw new E(`${key} is not null`);
    }
    return x;
};

const id = x => x;
