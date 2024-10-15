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
const { Builder, By, Key, until } = require('selenium-webdriver');

let driver; // Define the driver variable at a higher scope

async function openBrowser() {
  driver = await new Builder().forBrowser('firefox').build(); // Initialize the driver
}

async function searchOnYouTube() {
  try {
    await driver.get('https://www.youtube.com');
    
    // Locate the search input field by its name 'search_query' and enter your query
    const searchInput = await driver.findElement(By.name('search_query'));
    await searchInput.clear();
    await searchInput.sendKeys('selenium tutorial', Key.RETURN);

    // Wait for the search button (with class name 'style-scope ytd-searchbox') to be present and clickable
    const searchButton = await driver.wait(until.elementLocated(By.className('style-scope ytd-searchbox')), 10000);
    await searchButton.click();

    // Optionally, you can add additional actions or waiting here

  } catch (error) {
    console.error(error);
  }
  // Do not use driver.quit() here to keep the browser open
}

// First, open the browser
openBrowser().then(() => {
  // Once the browser is open, perform the search
  searchOnYouTube();
});
