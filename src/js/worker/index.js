import { AutoTokenizer, env, Pipeline, pipeline, PreTrainedTokenizer } from '@xenova/transformers';
import { expose } from 'comlink';
import { getSimilarK } from './similarity';
import { IEmbedder } from '../iembedder';

env.backends.onnx.wasm.numThreads = 4;

/**
 * @type {Pipeline | null}
 */
let embedder = null;

/**
 * @type {PreTrainedTokenizer | null}
 */
let tokenizer = null

/**
 * @implements {IEmbedder}
 */
class Embedder {
    /**
     * @param {ModelConfig} modelConfig - The configuration object for the model.
     * @param {Function} [progressCb]
     * @returns {Promise<void>} 
     */
    async loadModel(modelConfig, progressCb) {
        const { modelName } = modelConfig;
        console.log(`loadModel: ${modelName}`);
        tokenizer = await AutoTokenizer.from_pretrained(modelName);
        embedder = await pipeline(
            "feature-extraction", 
            modelName,
            {
                progress_callback: (progress) => {
                    if (progressCb) {
                        progressCb(progress);
                    }
                    // console.log(`progress: ${progress}`)
                }
            }
        );
    }

    /**
     * @param {string} text
     * @param {EmbeddingConfig} embeddingConfig
     * @returns {Promise<EmbeddingVector>}
     */
    async embed(text, embeddingConfig) {
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
     * 
     * @param {string} text 
     * @returns {Promise<Array<string>>}
     */
    async tokenize(text) {
        if (!tokenizer) {
            throw new Error('Tokenizer not initialized');
        }
        return await tokenizer(text)["input_ids"]["data"];
    }

    /**
     * @param {EmbeddingVector} queryEmbedding 
     * @param {EmbeddingMap} embeddingMap 
     * @param {SearchConfig} searchConfig 
     * @returns {Promise<Array<SearchResult>>}
     */
    async search(queryEmbedding, embeddingMap, searchConfig) {
        console.log(`search: map length ${Object.keys(embeddingMap).length}`);
        return getSimilarK(queryEmbedding, embeddingMap, searchConfig)
    }
}

expose(Embedder);