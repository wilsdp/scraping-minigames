## Getting Started

To start the application, follow these steps:

1. Make sure you have Node.js and npm installed on your machine.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

This will launch the application in your default web browser.

### Checking Element Counts

Below is an example of how to log the number of elements found by a query in a JavaScript application using Puppeteer:

```javascript
const gDataHandles = await mb_football.page.$$(
  "div.main-container.main-container--colored.center-helper",
)
// Check how many elements are found
console.log(`Found ${gDataHandles.length} data handles`)
```
