const WebSocket = require('ws');

async function scrapeGameData() {
  const resetTime = 15; // 3 PM
  let gameReset = false; // Track game reset
  let count = 0; // Initialize the count

  // Function to reset the count at 3 PM
  const resetCount = () => {
    const now = new Date();
    if (now.getHours() === resetTime && now.getMinutes() === 0) {
      if (!gameReset) {
        gameReset = true; // Set game reset flag
        console.log(`Game Reset at 3 PM. Starting Round ${count}`);
        count++; // Increment the round count when the game resets
      }
    } else {
      gameReset = false; // Reset game reset flag
    }
  }

  // WebSocket connection function
  function connectWebSocket() {
    // Connecting to WebSocket Web Server at the specified URL
    // wss://minidata.fusoft001.com/minidata?gametype=3000
    const ws = new WebSocket('wss://minidata.fusoft001.com/minidata?gametype=6500', {
      rejectUnauthorized: false
    });

    // An 'open event' of the WebSocket connection. If it was successfully accessed, the provided function is executed.
    ws.on('open', function open() {
      console.log('Connected to the WebSocket server');
    });

    // This is an event handler for the 'message' event of WebSocket connection. When the server sends a message, the provided function is executed.
    ws.on('message', function incoming(data) {
      // Parse the incoming message data as a JSON object.
      try {
        const sData = JSON.parse(data.toString());
        // Check if the message structure matches the expected structure
        if (sData && sData.FUN === 'result' && sData.DATA && sData.DATA.data) {
          console.log(sData); // Display the filtered JSON data
        }
      } catch (error) {
        // Handle JSON parsing errors
        console.error('Error parsing JSON:', error);
      }
    });

    // Event handler for the 'close' event of the WebSocket connection. When the WebSocket connection is closed, the provided function is executed.
    ws.on('close', function close() {
      // Indicate that the WebSocket connection has been closed.
      console.log('Disconnected from the WebSocket server');
      // Indicate that the script will attempt to reconnect to the WebSocket server in 5 seconds.
      console.log('Trying to reconnect in 5 seconds...');
      // Reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    });

    // Set up an event handler for the 'error' event of the WebSocket connection. When an error occurs with the WebSocket connection, the provided function is executed.
    ws.on('error', function error(err) {
      console.error('Error:', err);
    });
  }

  try {
    connectWebSocket(); // Start WebSocket connection
  } catch (error) {
    console.error(error);
  }
}

scrapeGameData();
