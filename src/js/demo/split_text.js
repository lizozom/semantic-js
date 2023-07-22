/**
 * @param {string} text
 * @returns {Promise<Array<string> | null>}
 */
export async function splitText(text) {
    return splitBySentences(text);
}

/**
 *
 * @param {string} text
 * @returns {Array<string>}
 */
function splitBySentences(text) {
    const matches = text.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
    const trimmed = matches.map(match => match.trim());
    return trimmed;
}
