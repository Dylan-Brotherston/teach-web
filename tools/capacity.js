'use strict';

const NodeCache = require('node-cache');
const classutil = require('./classutil');

const cache = new NodeCache({
    stdTTL: 600
});

const getCapacity = async (classNum) => {
    const cached = cache.get(`${classNum}`);
    if (cached) {
        return cached['COMP1521'][`${classNum}`];
    }

    const avail = await classutil.checkAvailability('COMP', 2);

    if (!avail) {
        return null;
    }

    cache.set(`${classNum}`, avail);

    return avail['COMP1521'][`${classNum}`];
};

exports.getCapacity = getCapacity;