import { wrap } from "comlink";
import { IEmbedder } from "./types";

/**
 * @type {import("comlink").Remote<IEmbedder>}
 */
const Embedder = wrap(new Worker('worker.js'));

/**
 * @type {typeof Embedder | null};
 */
let embedder = null;
/**
 * @type {Object<string, EmbeddingVector>}
 */
let embeddingCache = {};

/**
 * Initialize the semantic model.
 * @param {ModelConfig} modelConfig - The configuration object for the model.
 * @returns {Promise<void>} A promise that resolves to true if the model is successfully initialized, false otherwise.
 */
export async function loadModel(modelConfig = { modelName: "Xenova/all-MiniLM-L6-v2" }) {
    // @ts-ignore
    embedder = await new Embedder();
    if (!embedder) {
        throw new Error('Embedder not initialized');
    }
    await embedder.loadModel(modelConfig);
}

/**
 * @param {string} text 
 * @param {EmbeddingConfig} embeddingConfig
 * @returns {Promise<EmbeddingVector>}
 */
export async function embed(text, embeddingConfig) {
    if (!embedder) {
        throw new Error('Embedder not initialized');
    }

    if (text in embeddingCache) {
        return embeddingCache[text];
    }

    return embedder.embed(text, embeddingConfig);
}

/**
 * @param {Array<string>} texts
 * @param {EmbeddingConfig} embeddingConfig
 * @returns {Promise<EmbeddingMap>}
 */
export async function embedBatch(texts, embeddingConfig) {
    if (!embedder) {
        throw new Error('Embedder not initialized');
    }

    return embedder.embedBatch(texts, embeddingConfig);
}

/**
 * @param {*} embeddingMap 
 * @param {*} queryEmbedding 
 * @param {*} searchConfig 
 * @returns {Promise<Array<SearchResult>>}
 */
export async function semanticSearch(embeddingMap, queryEmbedding, searchConfig) {
    if (!embedder) {
        throw new Error('Embedder not initialized');
    }

    return embedder.search(embeddingMap, queryEmbedding, searchConfig);
}
