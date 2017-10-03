/*
** Created by Blowa on 6/15/2017.
** Fixed by DarkyZ on 16/08/2017.
*/
const findPattern = require('./findPattern.js').findPatternWithMask;

function patch(data, port)
{
    let replacement = [];
    const ptrnPort = [0x8B, 0x0D, 0x00, 0x00, 0x00, 0x00, 0x8B, 0x09, 0x8B, 0x15, 0x00, 0x00, 0x00, 0x00, 0x8B, 0x12, 0xE8, 0x00, 0x00, 0x00, 0x00, 0xC3];
    const maskPort = 'xx????xxxx????xxx????x';
    const replaceBytes = [0xB9, 0x00, 0x00, 0x90, 0x90, 0x90];

    let offset = findPattern(data, ptrnPort, maskPort);

    if (offset === -1)
        return;

    replaceBytes.splice(1, 0, (port & 0xFF00) >> 8);
    replaceBytes.splice(1, 0, port & 0xFF);

    for (let i = 0; i < replaceBytes.length; ++i) {
        replacement.push({
            offset: offset + i,
            data: replaceBytes[i]
        })
    }
    return replacement;
}

module.exports = patch;
