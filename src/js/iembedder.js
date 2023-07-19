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
     * @param {EmbeddingVector} queryEmbedding 
     * @param {EmbeddingMap} embeddingMap 
     * @param {SearchConfig} [searchConfig] 
     * @returns {Promise<Array<SearchResult>>}
     */
    async search(queryEmbedding, embeddingMap, searchConfig) {
        throw new Error('Not implemented');
    }

    /**
     * @abstract
     * @param {string} text 
     * @returns {Promise<Array<string>>}
     */
    async tokenize(text) {
        throw new Error('Not implemented');
    }
}