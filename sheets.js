// Load all levels from Google Sheets
async function getSheet(sheetName) {

    // The ID of the Google spreadsheet
    const spreadsheetID = "1gg5hyZiUSGLVQuIhOqh3FOI9iR0oO2zdQwefgqPkvaE";

    // Ask Google Sheets for the Levels sheet
    const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    // Get information from the spreadsheet
    const response = await fetch(url);

    // Turn the response into text
    const data = await response.text();

    // Split the spreadsheet into rows
    const rows = data.split("\n");

    // Turn the rows into level objects
  const rowsWithoutHeader = rows.slice(1);

const sheetData = rowsWithoutHeader.map(row => {

    const columns = row.split(",").map(value =>
        value.replace(/^"|"$/g, "")
    );

    return columns;

});

return sheetData;

    // Give the levels back to whatever called this function
    return levels;
}

// Get Players data from sheets
async function getPlayers() {

    // Get the raw data from the Players sheet
    const rows = await getSheet("Players");

    // Turn each row into a player object
    const players = rows.map(row => {

        return {
            name: row[0],
            tags: row[1]
        };

    });

    return players;
}

// Get Comepletions data from sheets
async function getCompletions() {

    // Get the raw data from the Completions sheet
    const rows = await getSheet("Completions");

    // Turn each row into a completion object
    const completions = rows.map(row => {

        return {
            player: row[0],
            levelID: row[1]
            
        };

    });

    return completions;
}

//  
async function getPlayerScores() {

    // Get all of the data
    const levels = await getSheet("Levels");
    const players = await getPlayers();
    const completions = await getCompletions();

    // Convert the level rows into useful objects
    const levelData = levels.map(row => {

        return {
            levelID: row[0],
            points: Number(row[3])
        };

    });

    // Calculate each player's score
    const playerScores = players.map(player => {

        // Find this player's completions
        const playerCompletions = completions.filter(completion =>
            completion.player === player.name
        );

        // Start their score at zero
        let points = 0;

        // Look at every level they completed
        playerCompletions.forEach(completion => {

            // Find the level they completed
            const level = levelData.find(level =>
                level.levelID === completion.levelID
            );

            // Add that level's points
            if (level) {
                points += level.points;
            }

        });

        return {
            name: player.name,
            points: points,
            tags: player.tags
        };

    });

    return playerScores;
}

// Get colors for player tags
function tagColor(tag) {

    let hash = 0;

    for (let i = 0; i < tag.length; i++) {

        hash = tag.charCodeAt(i) + ((hash << 5) - hash);

    }

    const color = Math.abs(hash).toString(16).substring(0, 6);

    return "#" + color.padStart(6, "0");
}
