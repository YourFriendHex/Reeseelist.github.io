// Load all levels from Google Sheets
async function getLevels() {

    // The ID of our Google spreadsheet
    const spreadsheetID = "1gg5hyZiUSGLVQuIhOqh3FOI9iR0oO2zdQwefgqPkvaE";

    // Ask Google Sheets for the Levels sheet
    const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:csv&sheet=Levels`;

    // Get information from the spreadsheet
    const response = await fetch(url);

    // Turn the response into text
    const data = await response.text();

    // Split the spreadsheet into rows
    const rows = data.split("\n");

    // Turn the rows into level objects
    const levels = rows.slice(1).map(row => {

        const columns = row.split(",").map(value =>
            value.replace(/^"|"$/g, "")
        );

        return {
            levelID: columns[0],
            name: columns[1],
            rank: Number(columns[2]),
            points: Number(columns[3]),
            creator: columns[4],
            verifier: columns[5]
        };

    });

    // Give the levels back to whatever called this function
    return levels;
}
