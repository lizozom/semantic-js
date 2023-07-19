import { wrap, proxy } from 'comlink';
import { IEmbedder } from './iembedder';

/**
 * @type {import("comlink").Remote<IEmbedder>}
 */
const Embedder = wrap(
    new Worker(
        /* webpackChunkName: "worker" */ new URL('./worker/index.js', import.meta.url)
    )
);

/**
 * @type {typeof Embedder | null};
 */
let embedder = null;

/**
 * @returns {typeof Embedder}
 */
export function getEmbedder() {
    if (!embedder) {
        throw new Error('Embedder not initialized');
    }
    return embedder;
}

/**
 * Initialize the semantic model.
 * @param {ModelConfig} modelConfig - The configuration object for the model.
 * @param {Function} [progressCb]
 * @returns {Promise<void>} A promise that resolves to true if the model is successfully initialized, false otherwise.
 */
export async function init(modelConfig = { modelName: 'Xenova/all-MiniLM-L6-v2' }, progressCb) {
    console.log(`init: ${modelConfig.modelName}`);
    // @ts-ignore
    embedder =  await new Embedder();
    const proxiedProgressCb = progressCb ? proxy(progressCb) : undefined;
        
    await getEmbedder().loadModel(modelConfig, proxiedProgressCb);
}

/**
 * Embed the content using the semantic model.
 * @param {string} content - The content to be embedded 
 * @param {EmbeddingConfig} config - The configuration object for embedding.
 * @returns {Promise<EmbeddingVector>} A promise that resolves to a mapping of embedded content.
 */
export async function embed(content, config = { pooling: 'mean', normalize: true }) {
    console.log(`embed: length ${content.length}`)    
    return getEmbedder().embed(content, config);
}

/**
 * Embed the content using the semantic model.
 * @param {Array<string>} content - The content to be embedded 
 * @param {EmbeddingConfig} config - The configuration object for embedding.
 * @returns {Promise<EmbeddingMap>} A promise that resolves to a mapping of embedded content.
 */
export async function embedContent(content, config = { pooling: 'mean', normalize: true }) {
    console.log(`embedContent: length ${content.length}`)
    return getEmbedder().embedBatch(content, config);
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
    return getEmbedder().search(queryEmbedding, embeddingMap);
}

/**
 * Tokenize the content using the semantic model.
 * @param {string} text - The content to be tokenized
 * @returns {Promise<Array<string>>} A promise that resolves to an array of tokens.
 */
export async function tokenize(text) {
    console.log(`tokenize: ${text}`)
    return getEmbedder().tokenize(text);
}
