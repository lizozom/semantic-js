import { env, Pipeline, pipeline } from '@xenova/transformers';
import { expose } from 'comlink';
import { getSimilarK } from './similarity';
import { IEmbedder } from '../iembedder';

env.backends.onnx.wasm.numThreads = 4;

/**
 * @type {Promise<Pipeline> | null}
 */
let embedderPromise = null;

/**
 * @implements {IEmbedder}
 */
class Embedder {
    /**
     * @param {ModelConfig} modelConfig - The configuration object for the model.
     * @returns {Promise<void>} 
     */
    async loadModel(modelConfig) {
        const { modelName } = modelConfig;
        console.log(`loadModel: ${modelName}`);
        embedderPromise = pipeline("embeddings", modelName);
        await embedderPromise;
    }

    /**
     * @param {string} text
     * @param {EmbeddingConfig} embeddingConfig
     * @returns {Promise<EmbeddingVector>}
     */
    async embed(text, embeddingConfig) {
        const embedder = await embedderPromise;
        if (!embedder) {
            throw new Error('Embedder not initialized');
        }
        const { pooling, normalize } = embeddingConfig;
        const e0 = await embedder(text, { pooling, normalize });
        const result = e0["data"];
        return result;
    }

    /**
     * @param {Array<string>} texts
     * @param {EmbeddingConfig} embeddingConfig
     * @returns {Promise<EmbeddingMap>}
     */
    async embedBatch(texts, embeddingConfig) {
        /**
         * @type {EmbeddingMap}
         */
        const embeddingMap = {};
        const promiseArr = [];
        for (const text of texts) {
            promiseArr.push(this.embed(text, embeddingConfig));
        }
        const resolved = await Promise.all(promiseArr)
        for (let i = 0; i< resolved.length; i++) {
            embeddingMap[texts[i]] = resolved[i];

        }
        return embeddingMap;
    }

    /**
     * @param {EmbeddingMap} embeddingMap 
     * @param {EmbeddingVector} queryEmbedding 
     * @param {SearchConfig} searchConfig 
     * @returns {Promise<Array<SearchResult>>}
     */
    async search(embeddingMap, queryEmbedding, searchConfig) {
        console.log(`search: map length ${Object.keys(embeddingMap).length}`);
        return getSimilarK(embeddingMap, queryEmbedding, searchConfig)
    }
}

expose(Embedder);