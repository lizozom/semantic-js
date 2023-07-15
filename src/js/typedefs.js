/**
 * Configuration options for embedding content.
 * @typedef {Object} EmbeddingConfig
 * @property {boolean} normalize - Whether to normalize the embeddings. 
 * @property {string} language - The language of the content.
 * @property {string} pooling - The pooling strategy for generating the embedding.
 */

/**
 * Configuration options for the model.
 * @typedef {Object} ModelConfig
 * @property {string} modelName - The name of the model.
 */

/**
 * @typedef {Object} SplitConfig
 * @property {string} type - The type of split.
 */

/**
 * Represents an embedding vector.
 * @typedef {Array<number>} EmbeddingVector
 */

/**
 * Represents a mapping of content to embedding vectors.
 * @typedef {Object.<string, EmbeddingVector>} EmbeddingMap
 */

/**
 * Represents a search result.
 * @typedef {Object} SearchResult
 * @property {string} text - The content associated with the search result.
 * @property {number} score - The similarity score of the search result.
 */

/**
 * @typedef {Object} SearchConfig
 * @property {number} [topK] - The number of search results to return.
 */
