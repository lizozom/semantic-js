import { embed, embedBatch, loadModel, semanticSearch } from './semantic';
/**
 * Initialize the semantic model.
 * @param {ModelConfig} modelConfig - The configuration object for the model.
 * @returns {Promise<void>} A promise that resolves to true if the model is successfully initialized, false otherwise.
 */
export async function init(modelConfig = { modelName: 'Xenova/all-MiniLM-L6-v2' }) {
    console.log(`init: ${modelConfig.modelName}`)
    await loadModel(modelConfig);
}

/**
 * Embed the content using the semantic model.
 * @param {string} content - The content to be embedded 
 * @param {EmbeddingConfig} config - The configuration object for embedding.
 * @returns {Promise<EmbeddingVector>} A promise that resolves to a mapping of embedded content.
 */
export async function embed(content, config = { pooling: 'mean', normalize: true }) {
    const isArray = Array.isArray(content);
    console.log(`embed: length ${content.length}`)
    
    return await embed(content, config);
}

/**
 * Search for similar content using the semantic model.
 * @param {string} query - The query for searching similar content.
 * @param {EmbeddingMap} embeddingMap - The mapping of content to embedding vectors.
 * @param {EmbeddingConfig} config
 * @returns {Promise<Array<SearchResult>>} A promise that resolves to an array of search results.
 */
export async function search(query, embeddingMap, config = { pooling: 'mean', normalize: true }) {
    console.log(`search: ${query}`)
    const queryEmbedding = await embed(query, config);
    return semanticSearch(embeddingMap, queryEmbedding, config);
}
