# semantic-js

A library for seamless frontend (no server side) semantic search in the browser.

### Installation

`npm install @lizozom/semanticjs --save`

### Run the demo page

Checkout this repository and run the following commands:

`npm install`

`npm start`


### Usage Example

```js
import { init, embed, search } from '@lizozom/semanticjs';

window.load = () => {
    await init({
        modelName: 'Xenova/all-MiniLM-L6-v2',
    });

    const pageContent = document.getElementById('main-text-cont').value;
    const splitContent = splitText(pageContent);
    const embeddingMap = await embedContent(splitContent);
    const searchResults = await search('search query', embeddingMap);
}

```
