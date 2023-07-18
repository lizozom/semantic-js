// @ts-nocheck
import { init, embedContent, search } from '../index';

/** @type {EmbeddingMap | undefined} */ 
let embeddingMap = undefined;

// @ts-ignore
function setupEventListeners () {
    const submitEl = document.getElementById('submit_button');
    submitEl.addEventListener('click', async () => {
        const inputEl = document.getElementById('input-text');
        const results = await search(inputEl.value, embeddingMap);
        console.log(results);
    })
}

function enableButton() {
    const submitEl = document.getElementById('submit_button');
    submitEl.removeAttribute('disabled');
    submitEl.textContent = 'Search';
}

/**
 * Setup the application when the page loads.
 */
window.onload = async function () {
    await init();
    enableButton();

    const inputEl = document.getElementById('input-text');
    // @ts-ignore
    const content = inputEl.value;

    const startTime = performance.now();
    embeddingMap = await embedContent(content);
    console.log(`Took ${performance.now() - startTime} ms to embed ${content.length} characters`);

    setupEventListeners();
};
