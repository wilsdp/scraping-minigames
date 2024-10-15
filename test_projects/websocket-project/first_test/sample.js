//Example for automation on every other sites
//First
// const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

// async function openChrome () {
//     let driver = await new Builder().forBrowser(Browser.CHROME).build();
//     try {
//         await driver.get('https://www.google.com/ncr');
//         await driver.findElement(By.name('q')).sendKeys('what is Javascript', Key.RETURN);
//         await driver.wait(until.titleIs('javascript - Google Search'), 4000);
//     } finally {
//         await driver.quit();
//     }
// }

// openChrome()

// async function openFirefox () {
//     let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
//     try {
//         await driver.get('https://www.google.com/ncr');
//         await driver.findElement(By.name('q')).sendKeys('what is Javascript', Key.RETURN);
//         await driver.wait(until.titleIs('javascript - Google Search'), 4000);
//     } finally {
//         await driver.quit();
//     }
// }

// openFirefox()

//Second
// const webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox');

// let driver = new webdriver.Builder()
//     .forBrowser(webdriver.Browser.FIREFOX) //FIREFOX OR CHROME
//     .setChromeOptions(/* ... */)
//     .setFirefoxOptions(/* ... */)
//     .build();

//Third
// const {Builder} = require('selenium-webdriver');

// (async function helloSelenium() {
//   let driver = await new Builder().forBrowser('chrome').build();

//   await driver.get('https://selenium.dev');

//   await driver.quit();
// })();

//Fourth
//Refresh page using selenium JavaScript
// const { Builder, By, Key, until } = require('selenium-webdriver');

// async function refreshPage() {
//   // Create a WebDriver instance (for example, using Chrome)
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     // Navigate to a website
//     await driver.get('https://www.geeksforgeeks.org/');

//     // Perform actions with the driver
//     // For example, you can use driver.findElement and driver.sendKeys here

//     // Wait for something to happen
//     // For example, you can use driver.wait here

//     // Refresh the page
//     await driver.navigate().refresh();

//     // You can add additional actions or waiting as needed after the page refresh

//   } finally {
//     // Close the WebDriver instance when done
//     await driver.quit();
//   }
// }

// // Call the function to run the automation
// refreshPage();

//Fifth
//Keep the Browser Open
// const { Builder, By, Key, until } = require('selenium-webdriver');

// async function refreshPage() {
//   // Create a WebDriver instance (for example, using Chrome)
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     // Navigate to a website
//     await driver.get('https://www.geeksforgeeks.org/');

//     // Perform actions with the driver
//     // For example, you can use driver.findElement and driver.sendKeys here

//     // Wait for something to happen
//     // For example, you can use driver.wait here

//     // Refresh the page
//     await driver.navigate().refresh();

//     // You can add additional actions or waiting as needed after the page refresh

//     // The browser will remain open after this point

//   } finally {
//     // You can remove the following line to keep the browser open
//     // await driver.quit();
//   }
// }

// // Call the function to run the automation
// refreshPage();

//Sixth
//Click a Button Element on a Website
// const { Builder, By, until } = require('selenium-webdriver');

// async function navigateToGoogle() {
//   const driver = await new Builder().forBrowser('firefox').build();

//   try {
//     await driver.get('https://www.google.com/');

//     // Explicit wait for the "I'm Feeling Lucky" button to be clickable
//     const feelingLuckyButton = await driver.findElement(By.name('btnI'));
//     await driver.wait(until.elementIsVisible(feelingLuckyButton), 5000);
//     await driver.wait(until.elementIsEnabled(feelingLuckyButton), 5000);

//     // Click the button
//     await feelingLuckyButton.click();

//     // Additional actions after clicking the button

//   } finally {
//     await driver.quit();
//   }
// }

// navigateToGoogle();

//With Button Click
// const { Builder, By, Key, until } = require('selenium-webdriver');

// async function searchWithFirefox() {
//     let driver = await new Builder().forBrowser('firefox').build();
//     try {
//         await driver.get('https://www.google.com/ncr');
//         await driver.findElement(By.name('q')).sendKeys('what is Javascript', Key.RETURN);
        
//         // Wait for the search button (with class name 'sbico') to be present and clickable
//         const searchButton = await driver.wait(until.elementLocated(By.className('sbico')), 10000);
//         await searchButton.click();
        
//         // Optionally, you can add additional actions or waiting here

//         // Keep the browser open
//     } catch (error) {
//         console.error(error);
//     }
//     // Do not use driver.quit() here to keep the browser open
// }

// searchWithFirefox();

//For Youtube Sites
// const { Builder, By, Key, until } = require('selenium-webdriver');

// let driver; // Define the driver variable at a higher scope

// async function openBrowser() {
//   driver = await new Builder().forBrowser('firefox').build(); // Initialize the driver
// }

// async function searchOnYouTube() {
//   try {
//     await driver.get('https://www.youtube.com');
    
//     // Locate the search input field by its name 'search_query' and enter your query
//     const searchInput = await driver.findElement(By.name('search_query'));
//     await searchInput.clear();
//     await searchInput.sendKeys('selenium tutorial', Key.RETURN);

//     // Wait for the search button (with class name 'style-scope ytd-searchbox') to be present and clickable
//     const searchButton = await driver.wait(until.elementLocated(By.className('style-scope')), 10000);
//     await searchButton.click();

//     // Optionally, you can add additional actions or waiting here

//   } catch (error) {
//     console.error(error);
//   }
//   // Do not use driver.quit() here to keep the browser open
// }

// // First, open the browser
// openBrowser().then(() => {
//   // Once the browser is open, perform the search
//   searchOnYouTube();
// });

// const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

// async function openFirefox () {
//     let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
//     try {
//         await driver.get('https://www.youtube.com');
//         await driver.findElement(By.name('search_query')).sendKeys('selenium tutorial', Key.RETURN);
//         await driver.wait(until.titleIs('selenium - Youtube Search'), 4000);
//     } catch (error) {
//         console.error(error);
//     }
// }

// openFirefox()

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Scrape Game Data Sample
// const { Builder, By, until } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');

//     // Wait for the page to load (you may need to adjust the waiting time)
//     await driver.sleep(5000);

//     // Use XPath to locate and extract data from a specific element
//     const firstXPathExpression = '//*[@id="history"]/li[1]'; // Replace with your XPath expression
//     const firstElement = await driver.findElement(By.xpath(firstXPathExpression));
//     const firstData = await firstElement.getText();

//     console.log('Extracted data from the first element:', firstData);

//     // Add another XPath expression to locate and extract data from another element
//     const secondXPathExpression = '//*[@id="history"]/li[2]'; // Replace with your XPath expression
//     const secondElement = await driver.findElement(By.xpath(secondXPathExpression));
//     const secondData = await secondElement.getText();

//     console.log('Extracted data from the second element:', secondData);


//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Second Sample Scrape Game
// const { Builder, By } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     while (true) { // Run indefinitely
//       let timerValue;

//       // Wait for the timer value to be '30' (9 seconds of spinning)
//       do {
//         const timerElement = await driver.findElement(By.id('time'));
//         timerValue = await timerElement.getText();
//       } while (timerValue !== '30');

//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const secondElementXPath = '//*[@id="rotate"]';
//       const secondElement = await driver.findElement(By.xpath(secondElementXPath));  

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await secondElement.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img')); 
//       const imgSrc = await imgElement.getAttribute('src');

//       console.log(`Round ${roundValue} - First Element`);
//       if (imgSrc.includes('item_05_1.gif')) { //<img src="/webmany/casiontt/jwc/static/picture/item_05_1.gif">
//         console.log('Angel');
//       } else if (imgSrc.includes('item_05_2.gif')) {
//         console.log('Demon');
//       }
   
//       // Wait for the timer value to be '40' (31 seconds of waiting)
//       do {
//         const timerElement = await driver.findElement(By.id('time'));
//         timerValue = await timerElement.getText();
//       } while (timerValue !== '40');
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Third Sample
// const { Builder, By } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));  

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img')); 
//       const imgSrc = await imgElement.getAttribute('src');

//       console.log(`Round ${roundValue}`);

//       if (imgSrc.includes('item_05_1.gif')) {
//         console.log('Angel');
//       } else if (imgSrc.includes('item_05_2.gif')) {
//         console.log('Demon');
//       }

//       await driver.sleep(50000); // Wait for 9 seconds before scraping again
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Fourth Sample
// const { Builder, By } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));  

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img')); 
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
        
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log(`Round ${roundValue} - Angel`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log(`Round ${roundValue} - Demon`);
//         }

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Fifth Sample
// const { Builder, By } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));  

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img')); 
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
        
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log(`Spin Score: ${roundValue} - Angel`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log(`Spin Score: ${roundValue} - Demon`);
//         }

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();


// Six Sample
// const { Builder, By } = require('selenium-webdriver');

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   let count = 0; // Initialize the count
//   const resetTime = 15; // 3 PM
//   let gameReset = false; // Track game reset

//   try {
//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     // Function to reset the count at 3 PM
//     const resetCount = () => {
//       const now = new Date();
//       if (now.getHours() === resetTime && now.getMinutes() === 0) {
//         if (!gameReset) {
//           gameReset = true; // Set game reset flag
//           console.log(`Game Reset at 3 PM. Starting Round ${count}`);
//           count++; // Increment the round count when the game resets
//         }
//       } else {
//         gameReset = false; // Reset game reset flag
//       } 
//     };

//     setInterval(resetCount, 60000); // Check every minute
    
//     //Print Round 1
//     console.log(`Round ${count}`);
//     count++;

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));  

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img')); 
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log(`Angel - Got Score: ${roundValue}`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log(`Demon - Got Score: ${roundValue}`);
//         }

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Seven Sample
// const { Builder, By } = require('selenium-webdriver');
// const WebSocket = require('ws'); // Import WebSocket module

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   let count = 0; // Initialize the count
//   const resetTime = new Date();
//   resetTime.setHours(15, 0, 0); // Set the reset time to 3:00 PM
//   let gameReset = false; // Track game reset

//   // WebSocket connection function
//   function connectWebSocket() {
//     const ws = new WebSocket('wss://minidata.fusoft001.com/minidata?gametype=3000', {
//       rejectUnauthorized: false
//     });

//     ws.on('open', function open() {
//       console.log('Connected to the websocket server');

//       // send message server for all results (1 time)
//       const message = {
//         "FUN": "GetEndGameList",
//         "DATA": {
//             "gametype": 3000
//         }
//       };
//       ws.send(JSON.stringify(message));
//     });

//     ws.on('message', function incoming(data) {
//       console.log('Received data:', data);
//     });

//     ws.on('close', function close() {
//       console.log('Disconnected from the websocket server');
//       console.log('Trying to reconnect in 5 seconds...');

//       // Reconnect after 5 seconds
//       setTimeout(connectWebSocket, 5000);
//     });

//     ws.on('error', function error(err) {
//       console.error('Error:', err);
//     });
//   }

//   try {
//     connectWebSocket(); // Start WebSocket connection

//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     // Function to reset the count at 3 PM
//     const resetCount = () => {
//       const now = new Date();
//       if (now.getHours() === resetTime.getHours() && now.getMinutes() === resetTime.getMinutes()) {
//         if (!gameReset) {
//           gameReset = true; // Set game reset flag
//           console.log(`Game Reset at 3 PM. Starting Round ${count}`);
//           count++; // Increment the round count when the game resets
//         }
//       } else {
//         gameReset = false; // Reset game reset flag
//       }
//     };

//     setInterval(resetCount, 60000); // Check every minute

//     // Print Round 1
//     console.log(`Round ${count}`);
//     count++;

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img'));
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log(`Angel - Got Score: ${roundValue}`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log(`Demon - Got Score: ${roundValue}`);
//         }

//         // Send data to WebSocket server
//         const wsMessage = {
//           "FUN": "ScrapedData",
//           "DATA": {
//             "roundValue": roundValue,
//             "imgSrc": imgSrc
//           }
//         };
//         // Send the scraped data as JSON to the WebSocket server
//         ws.send(JSON.stringify(wsMessage));

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

// Sample of Selenium-WebDriver but it shows Buffer not converted JSON Data
// const { Builder, By } = require('selenium-webdriver');
// const WebSocket = require('ws'); // Import WebSocket module

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   let count = 0; // Initialize the count
//   const resetTime = 15; // 3 PM
//   let gameReset = false; // Track game reset
//   let ws; // Declare the ws variable outside the connectWebSocket function

//   // Function to reset the count at 3 PM
//   const resetCount = () => {
//     const now = new Date();
//     if (now.getHours() === resetTime && now.getMinutes() === 0) {
//       if (!gameReset) {
//         gameReset = true; // Set game reset flag
//         console.log(`Game Reset at 3 PM. Starting Round ${count}`);
//         count++; // Increment the round count when the game resets
//       }
//     } else {
//       gameReset = false; // Reset game reset flag
//     }
//   };

  // WebSocket connection function
//   function connectWebSocket() {
//     ws = new WebSocket('wss://minidata.fusoft001.com/minidata?gametype=3000', {
//       rejectUnauthorized: false
//     });

//     ws.on('open', function open() {
//       console.log('Connected to the websocket server');
//       // send message server for all results (1 time)
//       const message = {
//         "FUN": "GetEndGameList",
//         "DATA": {
//           "gametype": 3000
//         }
//       };
//       ws.send(JSON.stringify(message));
//     });

//     ws.on('message', function incoming(data) {
//       console.log('Received WebSocket data:', data);
//       processWebSocketMessage(data); // Process WebSocket messages
//     });

//     ws.on('close', function close() {
//       console.log('Disconnected from the websocket server');
//       console.log('Trying to reconnect in 5 seconds...');
//       // Reconnect after 5 seconds
//       setTimeout(connectWebSocket, 5000);
//     });

//     ws.on('error', function error(err) {
//       console.error('Error:', err);
//     });
//   }

//   // Function to process WebSocket messages
//   function processWebSocketMessage(data) {
//     // Your WebSocket message processing logic here
//     // You can add the code from your previous example here
//   }

//   try {
//     connectWebSocket(); // Start WebSocket connection

//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     // Print Round 1
//     console.log(`Round ${count}`);
//     count++;

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img'));
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log(`Angel - Got Score: ${roundValue}`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log(`Demon - Got Score: ${roundValue}`);
//         }

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

//Nine Sample using for Selenium-Webdriver and WebSocket for getting JSON Data
// const { Builder, By } = require('selenium-webdriver');
// const WebSocket = require('ws'); // Import WebSocket module

// async function scrapeGameData() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   let count = 0; // Initialize the count
//   const resetTime = 15; // 3 PM
//   let gameReset = false; // Track game reset
//   let ws; // Declare the ws variable outside the connectWebSocket function

//   // Function to reset the count at 3 PM
//   const resetCount = () => {
//     const now = new Date();
//     if (now.getHours() === resetTime && now.getMinutes() === 0) {
//       if (!gameReset) {
//         gameReset = true; // Set game reset flag
//         console.log(`Game Reset at 3 PM. Starting Round ${count}`);
//         count++; // Increment the round count when the game resets
//       }
//     } else {
//       gameReset = false; // Reset game reset flag
//     }
//   }

//   // WebSocket connection function
//   function connectWebSocket() {
//     ws = new WebSocket('wss://minidata.fusoft001.com/minidata?gametype=3000', {
//       rejectUnauthorized: false
//     });

//     ws.on('open', function open() {
//       console.log('Connected to the websocket server');
//       // send message server for all results (1 time)
//       const message = {
//         "FUN": "GetEndGameList",
//         "DATA": {
//           "gametype": 3000
//         }
//       };
//       ws.send(JSON.stringify(message));
//     });

//     ws.on('message', function incoming(data) {
//       console.log('Received WebSocket data:', data);
//       processWebSocketMessage(data); // Process WebSocket messages
//     });

//     ws.on('close', function close() {
//       console.log('Disconnected from the websocket server');
//       console.log('Trying to reconnect in 5 seconds...');
//       // Reconnect after 5 seconds
//       setTimeout(connectWebSocket, 5000);
//     });

//     ws.on('error', function error(err) {
//       console.error('Error:', err);
//     });
//   }

//   // Function to process WebSocket messages
//   function processWebSocketMessage(data) {
//     // Convert the Buffer data to a string
//     const dataStr = data.toString('utf8');

//     try {
//       // Parse the string into a JSON object
//       const jsonData = JSON.parse(dataStr);
//       console.log('Received WebSocket JSON data:', jsonData);

//       // Your further processing logic for the JSON data here

//       // Example: If you want to do something with jsonData.FUN
//       if (jsonData.FUN === "SomeFunction") {
//         // Perform some action based on the FUN property
//         // For example:
//         console.log('Performing action based on FUN property');
//       }
//     } catch (error) {
//       console.error('Error parsing WebSocket data as JSON:', error);
//     }
//   }

//   try {
//     connectWebSocket(); // Start WebSocket connection

//     await driver.get('https://jwgamezone.com/angelsdemons');
//     await driver.sleep(5000); // Wait for the page to load

//     let previousImgSrc = ''; // Store the previous imgSrc

//     // Print Round 1
//     console.log(`Round ${count}`);
//     count++;

//     while (true) { // Run indefinitely
//       // Scrape data from the first element
//       const firstElementXPath = '//*[@id="history"]/li[1]/div[@class="content"]';
//       const firstElement = await driver.findElement(By.xpath(firstElementXPath));

//       const wheelXPath = '//*[@id="rotate"]';
//       const wheel = await driver.findElement(By.xpath(wheelXPath));

//       const roundValue = await firstElement.findElement(By.className('round')).getText();
//       const imgElement = await wheel.findElement(By.css('html body div.container div.mjs-game-box div.content div#rotate.item.item_05 img'));
//       const imgSrc = await imgElement.getAttribute('src');

//       if (imgSrc !== previousImgSrc) {
//         if (imgSrc.includes('item_05_1.gif')) {
//           console.log('\x1b[36m%s\x1b[0m',`Angel - Got Score: ${roundValue}`);
//         } else if (imgSrc.includes('item_05_2.gif')) {
//           console.log('\x1b[36m%s\x1b[0m',`Demon - Got Score: ${roundValue}`);
//         }

//         previousImgSrc = imgSrc; // Update the previous imgSrc
//       }

//       // Wait for a moment before checking again (e.g., 1 second)
//       await driver.sleep(1000);
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await driver.quit();
//   }
// }

// scrapeGameData();

// Ten Sample
// const WebSocket = require('ws');

// async function scrapeGameData() {
//   const resetTime = 15; // 3 PM
//   let gameReset = false; // Track game reset
//   let count = 0; // Initialize the count

//   // Function to reset the count at 3 PM
//   const resetCount = () => {
//     const now = new Date();
//     if (now.getHours() === resetTime && now.getMinutes() === 0) {
//       if (!gameReset) {
//         gameReset = true; // Set game reset flag
//         console.log(`Game Reset at 3 PM. Starting Round ${count}`);
//         count++; // Increment the round count when the game resets
//       }
//     } else {
//       gameReset = false; // Reset game reset flag
//     }
//   }

//   // WebSocket connection function
//   function connectWebSocket() {
//     // Connecting to web Scoket Web Server at the specified URL
//     const ws = new WebSocket('wss://minidata.fusoft001.com/minidata?gametype=3000', {
//       rejectUnauthorized: false
//     });

//     // An 'open event' of the websocket connection. If it was succesfully access, the provided function is executed.
//     ws.on('open', function open() {
//       console.log('Connected to the WebSocket server');
//     });

//     // This is an event handler for the 'message' event of WS connection. When the server sends a message,the provided function is executed.
//     ws.on('message', function incoming(data) {
//       //Inside the 'message' event handler, this line parses the incoming message data as a JSON object. The data received from the server is first converted to a string using toString(), and then it's parsed into a JavaScript object.
//       let sData = JSON.parse(data.toString())
//       console.log(sData) // this contains game-related data received from the WS Server
//     });

//     //Event handler for the 'close' event of the WS connection. When the WS connection is closed, the provided function is executed.
//     ws.on('close', function close() {
//       // Indicating that the WS connection has been closed.
//       console.log('Disconnected from the WebSocket server');
//       // Indicating that the script will attempt to reconnect to the WebSocket server in 5 seconds.
//       console.log('Trying to reconnect in 5 seconds...');
//       // Reconnect after 5 seconds
//       setTimeout(connectWebSocket, 5000);
//     });

//     //The sets up an event handler for the 'error' event of the WebSocket connection. When an error occurs with the WebSocket connection, the provided function is executed.
//     ws.on('error', function error(err) {
//       console.error('Error:', err);
//     });
//   }

//   try {
//     //This line calls the connectWebSocket function to initiate the WebSocket connection to the server.
//     connectWebSocket(); // Start WebSocket connection
//   } catch (error) {
//     console.error(error);
//   }
// }

// scrapeGameData();

//Eleven Sample
// const axios = require('axios');

// async function scrapeData() {
//   try {
//     // Use Axios to make HTTP requests for data with a timestamp
//     const timeStamp = Date.now();
//     const urlWithTimestamp = `https://named.com/data/minigame/nball/powerball5/result.json?_=${timeStamp}`;
    
//     const response = await axios.get(urlWithTimestamp);
//     const responseData = response.data;

//     // Process and extract the data from the response using JavaScript
//     // Example: Extract data from JSON response
//     const extractedData = response.data;

//     // Do something with the extracted data (e.g., save it, print it, etc.)
//     console.log(extractedData);

//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// // Call the scrapeData function to start scraping
// scrapeData();

// // Fetch data at regular intervals (every 5 minutes in this example)
// setInterval(scrapeData, 1000); // 300000 milliseconds = 5 minutes
// const axios = require('axios');
// const moment = require('moment');

// async function scrapeData() {
//   try {
//     // Use Axios to make HTTP requests for data with a timestamp
//     const timeStamp = Date.now();
//     const urlWithTimestamp = `https://named.com/data/minigame/nball/powerball5/result.json?_=${timeStamp}`;
    
//     const response = await axios.get(urlWithTimestamp);
//     const responseData = response.data;

//     // Process and extract the data from the response using JavaScript
//     // Example: Extract data from JSON response
//     const extractedData = response.data;

//     // Convert create_dt to a formatted date
//     const createdAt = moment(extractedData.create_dt, 'YYYYMMDDHHmmss').toDate();

//     // Add regDateTime representing the current date and time when the data was received
//     const regDateTime = new Date();

//     // Log the extracted data, createdAt, and regDateTime
//     console.log({
//       extractedData,
//       createdAt,
//       regDateTime,
//     });

//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// // Call the scrapeData function to start scraping
// scrapeData();

// // Fetch data at regular intervals (every 1 second in this example)
// setInterval(scrapeData, 1000);

// Powerball5 Game
// const axios = require('axios');
// const moment = require('moment');

// let lastDateRound = -1;

// async function scrapeData() {
//   try {
//     const timeStamp = Date.now();
//     const urlWithTimestamp = `https://named.com/data/minigame/nball/powerball5/result.json?_=${timeStamp}`;

//     const response = await axios.get(urlWithTimestamp);
//     const extractedData = response.data;

//     // Check if the date_round is different from the last processed date_round
//     if (extractedData.date_round !== lastDateRound) {
//       // Update the lastDateRound variable
//       lastDateRound = extractedData.date_round;

//       // Convert create_dt to a formatted date
//       const createdAt = moment(extractedData.create_dt, 'YYYYMMDDHHmmss').toDate();

//       // Add regDateTime representing the current date and time when the data was received
//       const regDateTime = new Date();

//       // Log the extracted data, createdAt, and regDateTime
//       console.log({
//         extractedData,
//         createdAt,
//         regDateTime,
//       });

//       // Wait for 5 minutes and 2 seconds before the next scrape
//       await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000 + 2000));
//     }

//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// // Call the scrapeData function to start scraping
// scrapeData();

// // Fetch data at regular intervals (every 1 second in this example)
// setInterval(scrapeData, 1000);

// Powerball3 Game
const axios = require('axios');
const moment = require('moment');

let lastDateRound = -1;

async function scrapeData() {
  try {
    const timeStamp = Date.now();
    const urlWithTimestamp = `https://named.com/data/minigame/nball/powerball3/result.json?_=${timeStamp}`;

    const response = await axios.get(urlWithTimestamp);
    const extractedData = response.data;

    // Check if the date_round is different from the last processed date_round
    if (extractedData.date_round !== lastDateRound) {
      // Update the lastDateRound variable
      lastDateRound = extractedData.date_round;

      // Convert create_dt to a formatted date
      const createdAt = moment(extractedData.create_dt, 'YYYYMMDDHHmmss').toDate();

      // Add regDateTime representing the current date and time when the data was received
      const regDateTime = new Date();

      // Log the extracted data, createdAt, and regDateTime
      console.log({
        extractedData,
        createdAt,
        regDateTime,
      });

      // Wait for 3 minutes and 2 seconds before the next scrape
      await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000 + 2000));
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the scrapeData function to start scraping
scrapeData();

// Fetch data at regular intervals (every 1 second in this example)
setInterval(scrapeData, 1000);


//Sample
   // let firstNum = rData.ball[0]
        // let ball = {
        //   n1: rData.ball[0],
        //   n2: rData.ball[1],
        //   n3: rData.ball[2],
        //   n4: rData.ball[3],
        //   n5: rData.ball[4],
        //   n6: rData.ball[5],
        // }


