/**
 * @interface
 * @class
 */
export class IEmbedder {
    /**
     * @abstract
     * @param {ModelConfig} modelConfig - The configuration object for the model.
     * @returns {Promise<void>}
     */
    loadModel(modelConfig) {
        throw new Error('Not implemented');
    }

    /**
     * @abstract
     * @param {string} text
     * @param {EmbeddingConfig} embeddingConfig
     * @returns {Promise<EmbeddingVector>}
     */
    async embed(text, embeddingConfig) {
        throw new Error('Not implemented');
    }

    /**
     * @abstract
     * @param {Array<string>} texts
     * @param {EmbeddingConfig} embeddingConfig
     * @returns {Promise<EmbeddingMap>}
     */
    async embedBatch(texts, embeddingConfig) {
        throw new Error('Not implemented');
    }

    /**
     * @abstract
     * @param {EmbeddingMap} embeddingMap 
     * @param {EmbeddingVector} queryEmbedding 
     * @param {SearchConfig} searchConfig 
     * @returns {Promise<Array<SearchResult>>}
     */
    async search(embeddingMap, queryEmbedding, searchConfig) {
        throw new Error('Not implemented');
    }
}