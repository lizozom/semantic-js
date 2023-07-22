// @ts-nocheck
import { init, embedContent, search } from '../index';
import { splitText } from './split_text';

/** @type {EmbeddingMap | undefined} */
let embeddingMap;

// @ts-ignore
function setupEventListeners() {
    const submitEl = document.getElementById('submit_button');
    submitEl.addEventListener('click', async() => {
        const inputEl = document.getElementById('input-text');
        const results = await search(inputEl.value, embeddingMap);
        console.log(results);
    });
}

function enableButton() {
    const submitEl = document.getElementById('submit_button');
    submitEl.removeAttribute('disabled');
    submitEl.textContent = 'Search';
}

/**
 * Setup the application when the page loads.
 */
window.onload = async function() {
    console.log('demo onload');
    await init({
        modelName: 'Xenova/all-MiniLM-L6-v2'
    }, (progress) => {
        if (progress.status === 'done') {
            console.log(`Loaded ${progress.name} (${progress.file})`);
        }
    });
    enableButton();
    setupEventListeners();

    const inputEl = document.getElementById('input-text');
    // @ts-ignore
    const content = inputEl.value;

    const splitContent = await splitText(content);
    const startTime = performance.now();
    embeddingMap = await embedContent(splitContent);
    console.log(`Took ${performance.now() - startTime} ms to embed ${content.length} characters`);
};
