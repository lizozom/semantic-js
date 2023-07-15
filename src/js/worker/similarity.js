
/**
 * @typedef {Array<number>} EmbeddingVector
 * @param {EmbeddingVector} queryEmbedding 
 * @param {EmbeddingVector} embedding
 * @returns {number}
 */
export function calculateCosineSimilarity(queryEmbedding, embedding) {
    if (queryEmbedding.length !== embedding.length) return NaN;
    let dotProduct = 0;
    let queryMagnitude = 0;
    let embeddingMagnitude = 0;
    let queryEmbeddingLength = queryEmbedding.length
    for (let i = 0; i < queryEmbeddingLength; i++) {
        dotProduct += queryEmbedding[i] * embedding[i];
        queryMagnitude += queryEmbedding[i] ** 2;
        embeddingMagnitude += embedding[i] ** 2;
    }
    return dotProduct / (Math.sqrt(queryMagnitude) * Math.sqrt(embeddingMagnitude));
}

/**
 * @param {EmbeddingMap} embeddingMap 
 * @param {EmbeddingVector} queryEmbedding 
 * @param {SearchConfig} searchConfig 
 * @returns {Array<SearchResult>}
 */
export function getSimilarK(embeddingMap, queryEmbedding, searchConfig ) {
    /** @type Array<SearchResult> */
    const results = [];
    Object.keys(embeddingMap).forEach((key) => {
        const textEmbedding = embeddingMap[key];
        const similarity = calculateCosineSimilarity(queryEmbedding, textEmbedding);
        results.push({
            text: key,
            score: similarity,
        });
    }); 

    results.sort((a, b) => b.score - a.score);
    const { topK } = searchConfig;
    return results.splice(0, topK || results.length);
}