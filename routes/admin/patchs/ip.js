/*
** Created by Blowa on 6/15/2017.
** Fixed by DarkyZ on 16/08/2017.
*/
const findPattern = require('./findPattern.js').findPattern;

module.exports = function (data, ip) {
    let replacement = [];
    const ptrnHost = [0x65, 0x73, 0x74, 0x00, 0xFF, 0xFF, 0xFF, 0xFF];

    let offset = findPattern(data, ptrnHost);

    if (offset === -1)
        return;

    offset += ptrnHost.length + 0x14;
    replacement.push({
        offset: offset,
        data: ip.length
    });
    offset += 4;
    for (let i = 0; i < ip.length; ++i) {
        replacement.push({
            offset: offset + i,
            data: ip[i].charCodeAt(0)
        });
    }
    for (let i = ip.length; i < 15; ++i) {
        replacement.push({
            offset: offset + i,
            data: 0
        });
    }
    offset += 20;
    replacement.push({
        offset: offset,
        data: ip.length
    });
    offset += 4;
    for (let i = 0; i < ip.length; ++i) {
        replacement.push({
            offset: offset + i,
            data: ip[i].charCodeAt(0)
        });
    }
    for (let i = ip.length; i < 15; ++i) {
        replacement.push({
            offset: offset + i,
            data: 0
        });
    }
    offset += 20;
    replacement.push({
        offset: offset,
        data: ip.length
    });
    offset += 4;
    for (let i = 0; i < ip.length; ++i) {
        replacement.push({
            offset: offset + i,
            data: ip[i].charCodeAt(0)
        });
    }
    for (let i = ip.length; i < 15; ++i) {
        replacement.push({
            offset: offset + i,
            data: 0
        });
    }
    offset += 20;
    replacement.push({
        offset: offset,
        data: ip.length
    });
    offset += 4;
    for (let i = 0; i < ip.length; ++i) {
        replacement.push({
            offset: offset + i,
            data: ip[i].charCodeAt(0)
        });
    }
    for (let i = ip.length; i < 15; ++i) {
        replacement.push({
            offset: offset + i,
            data: 0
        });
    }
    return replacement;
};
