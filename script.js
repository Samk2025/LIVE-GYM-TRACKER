async function updateData() {
  // Declares an asynchronous function so we can use 'await' for API calls

  const url = "https://api.thingspeak.com/channels/3191471/feeds.json?api_key=QZMVKJ1O8EW00E98&results=2";
  // Stores the ThingSpeak API URL that returns the latest channel data
  // results=2 means only the two most recent entries are fetched

  const response = await fetch(url)
  // Sends an HTTP request to the API and waits for the response

  const data = await response.json()
  // Converts the API response from JSON text into a JavaScript object

  const lastUser = data.feeds[data.feeds.length - 1]
  // Extracts the most recent feed entry from the returned data array

  const present = document.getElementById("present")
  // Gets the HTML element with id="present" (currently unused)

  const access = document.getElementById("access")
  // Gets the HTML element with id="access" (currently unused)

  const name = document.getElementById("name")
  // Gets the HTML element with id="name" (currently unused)

  const position = document.getElementById("position")
  // Gets the HTML element where role/entry status will be displayed

  const time = document.getElementById("time")
  // Gets the HTML element where the scan time will be displayed

  occupancy.textContent = lastUser.field3
  // Updates the occupancy display with data from field3 of the API feed

  position.textContent = lastUser.field1
  // Temporarily sets position text to the raw value from field1

  if (lastUser.field1 === "Sam entered") {
    // Checks if the latest event says "Sam entered"

    position.textContent = "Member entered";
    // Converts raw data into a user-friendly message
  }
  else if (lastUser.field1 === "Sam left") {
    // Checks if the event says "Sam left"

    position.textContent = "Member left";
    // Converts raw data into a clearer message
  }
  else {
    // Runs if the event is neither "Sam entered" nor "Sam left"

    position.textContent = lastUser.field1;
    // Displays the original event text
  }

  time.textContent = lastUser.field6
  // Updates the displayed time with data from field6
}

setInterval(updateData, 15000)
 // Calls updateData() every 15 seconds to keep data fresh

updateData()
 // Calls updateData() immediately when the page loads
