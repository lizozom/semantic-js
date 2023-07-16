import { embed, embedBatch, loadModel, semanticSearch } from './semantic';
import { SplitType } from './types';
import { splitText } from './split_text';

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
 * If the content is an array, it will be embedded as is, if no it will be split to sentences.
 * @param {string | Array<string>} content - The content to be embedded 
 * @param {EmbeddingConfig} config - The configuration object for embedding.
 * @returns {Promise<EmbeddingMap>} A promise that resolves to a mapping of embedded content.
 */
export async function embedContent(content, config = { pooling: 'mean', normalize: true }) {
    const isArray = Array.isArray(content);
    console.log(`embedContent: type ${isArray ? 'array' : 'string'} of length ${content.length}`)
    
    let inputTexts = isArray ? content : await splitText(content, { type: SplitType.Sentence });
    if (!inputTexts || inputTexts.length === 0) {
        return {};
    }
    return embedBatch(inputTexts, config);
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
