import { splitText } from '../split_text';

describe('splitText', () => {
    test('should split text into an array of sentences', async() => {
        const text = 'Hello! This is a sentence. Another sentence here.';
        const result = await splitText(text);

        expect(result).toEqual(['Hello!', 'This is a sentence.', 'Another sentence here.']);
    });

    test('should return an array even if theres no dot in the end of a sentence', async() => {
        const text = 'Hello! No dot here';
        const result = await splitText(text);

        expect(result).toEqual(['Hello!', 'No dot here']);
    });
});
