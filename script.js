async function loadLevels() {

    // The ID of our Google spreadsheet
    const spreadsheetID = "1gg5hyZiUSGLVQuIhOqh3FOI9iR0oO2zdQwefgqPkvaE";

    // Ask Google Sheets for the Levels sheet
    const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:csv&sheet=Levels`;

    // Fetch the spreadsheet
    const response = await fetch(url);

    // Turn the response into text
    const data = await response.text();

    // Print the spreadsheet data to the console
    console.log(data);
}

loadLevels();
