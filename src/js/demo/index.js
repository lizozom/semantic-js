import { init, embedContent } from '../index';

/**
 * Setup the application when the page loads.
 */
window.onload = async function () {
    await init();

    const inputEl = document.getElementById('input-text');
    // @ts-ignore
    const content = inputEl.value;

    const startTime = performance.now();
    const embeddingMap = await embedContent(content);
    console.log(`Took ${performance.now() - startTime} ms to embed ${content.length} characters`);
};
