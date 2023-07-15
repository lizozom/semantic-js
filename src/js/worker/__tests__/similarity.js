const { calculateCosineSimilarity, getSimilarK } = require('../similarity');

describe('utils', () => {
    describe('calculateCosineSimilarity', () => {
        test('should calculate the cosine similarity of identical vectors', () => {
            const queryEmbedding = [0.5, 0.3, 0.8];
            const embedding = [0.5, 0.3, 0.8];

            const result = calculateCosineSimilarity(queryEmbedding, embedding);

            expect(result).toBe(1);
        });

        test('should calculate the cosine similarity correctly', () => {
            const queryEmbedding = [0.5, 0.3, 0.8];
            const embedding = [0.7, 0.2, 0.9];

            const result = calculateCosineSimilarity(queryEmbedding, embedding);

            expect(result).toBeCloseTo(0.986, 3);
        });

        test('should return NaN if one of the vectors has 0 magnitude', () => {
            const queryEmbedding = [0, 0, 0];
            const embedding = [1, 1, 1];

            const result = calculateCosineSimilarity(queryEmbedding, embedding);

            expect(result).toBeNaN();
        });

        test('should return NaN for invalid input', () => {
            const queryEmbedding = [1, 2];
            const embedding = [3, 4, 5];

            const result = calculateCosineSimilarity(queryEmbedding, embedding);

            expect(result).toBeNaN();
        });


        describe('getSimilarK', () => {
            test('should return the top K similar results sorted by score', () => {
                const embeddingMap = {
                    'text1': [0.5, 0.3, 0.8],
                    'text2': [0.65, 0.4, 0.7],
                    'text3': [0.4, 0.6, 0.2],
                    'text4': [0.1, 0.9, 0.5]
                };
                const queryEmbedding = [0.6, 0.4, 0.7];
                const searchConfig = { topK: 2 };

                const results = getSimilarK(embeddingMap, queryEmbedding, searchConfig);

                expect(results).toHaveLength(2);
                expect(results[0].text).toBe('text2');
                expect(results[0].score).toBeCloseTo(0.999, 3);
                expect(results[1].text).toBe('text1');
                expect(results[1].score).toBeCloseTo(0.985, 3);
            });

            test('should return all results when topK is not specified', () => {
                const embeddingMap = {
                    'text1': [0.5, 0.3, 0.8],
                    'text2': [0.65, 0.4, 0.7],
                    'text3': [0.4, 0.6, 0.2],
                    'text4': [0.1, 0.9, 0.5]
                };
                const queryEmbedding = [0.6, 0.4, 0.7];
                const searchConfig = {};

                const results = getSimilarK(embeddingMap, queryEmbedding, searchConfig);

                expect(results).toHaveLength(4);
                expect(results[0].text).toBe('text2');
                expect(results[0].score).toBeCloseTo(0.999, 3);
                expect(results[2].text).toBe('text3');
                expect(results[2].score).toBeCloseTo(0.824, 3);
                expect(results[3].text).toBe('text4');
                expect(results[3].score).toBeCloseTo(0.741, 3);
            });

            test('should return an empty array when embeddingMap is empty', () => {
                /** @type EmbeddingMap */
                const embeddingMap = {};
                const queryEmbedding = [0.6, 0.4, 0.7];
                const searchConfig = { topK: 3 };

                const results = getSimilarK(embeddingMap, queryEmbedding, searchConfig);

                expect(results).toEqual([]);
            });
        });
    });
});