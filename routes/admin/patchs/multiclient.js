/*
** Created by Blowa on 6/15/2017.
** Fixed by DarkyZ on 16/08/2017.
*/
const findPattern = require('./findPattern.js').findPatternWithMask;

function patch(data) {
    const replacement = [];
    const ptrnMultiClient = [0x0F, 0x85, 0x00, 0x00, 0x00, 0x00, 0xE8, 0x00, 0x00, 0x00, 0x00, 0x48];
    const maskMultiClient = "xx????x????x";
    const replMultiClient = [0xEB, 0x42, 0x90, 0x90, 0x90, 0x90];

    const offset = findPattern(data, ptrnMultiClient, maskMultiClient);

    if (offset === -1)
        return;

    for (let i = 0; i < replMultiClient.length; ++i)
    {
        replacement.push({
            offset: offset + i,
            data: replMultiClient[i]
        });
    }
    return replacement;
}

module.exports = patch;