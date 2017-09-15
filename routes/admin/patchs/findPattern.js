/**
 * Created by Blowa on 6/15/2017.
 */

function match(src, key, start) {
    if (key.length + start > src.length)
        return false;
    for (let i = 0; i < key.length; ++i) {
        if (key[i] !== src[i + start])
            return false;
    }
    return (true);
}

function matchWithMask(src, key, mask, start) {
    if (key.length + start > src.length)
        return false;
    for (let i = 0; i < key.length; i++) {
        if (mask[i] === 'x' && key[i] !== src[i + start])
            return false;
    }
    return (true);
}

function findPattern(src, key) {
    for (let i = 0; i <= src.length - key.length; ++i)
        if (match(src, key, i))
            return i;
    return -1;
}

function findPatternWithMask(src, pattern, mask) {
    for (let i = 0; i <= src.length - pattern.length; ++i)
        if (matchWithMask(src, pattern, mask, i))
            return i;
    return -1;
}

module.exports = { findPattern, findPatternWithMask };