import { SplitType } from '../types';
import { splitText } from '../split_text';

describe('splitText', () => {
  test('should split text by sentences when splitType is SPLIT_TYPE.Sentence', async () => {
    const text = 'Hello! This is a sentence. Another sentence here.';
    const splitConfig = { type: SplitType.Sentence };
    const result = await splitText(text, splitConfig);

    expect(result).toEqual(['Hello!', 'This is a sentence.', 'Another sentence here.']);
  });

  test('should return null for an invalid splitType', async () => {
    const text = 'Some text';
    const splitConfig = { type: 'invalidSplitType' };

    const result = await splitText(text, splitConfig);

    expect(result).toBeNull();
  });

  test('should split text into an array of sentences', async () => {
    const text = 'Hello! This is a sentence. Another sentence here.';
    const result = await splitText(text, { type: SplitType.Sentence });

    expect(result).toEqual(['Hello!', 'This is a sentence.', 'Another sentence here.']);
  });

  test('should return an array even if theres no dot in the end of a sentence', async () => {
    const text = 'Hello! No dot here';
    const result = await splitText(text, { type: SplitType.Sentence });

    expect(result).toEqual(['Hello!', 'No dot here']);
  });
});
