import { SplitType } from "./types";

/**
 * @param {string} text 
 * @param {SplitConfig} splitConfig 
 * @returns {Promise<Array<string> | null>}
 */
export async function splitText(text, splitConfig) {
    const { type: splitType } = splitConfig;
    switch(splitType) {
        case SplitType.Sentence:
            return splitBySentences(text);
        default:
            console.error('Invalid split type');
            return null;
    }
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
