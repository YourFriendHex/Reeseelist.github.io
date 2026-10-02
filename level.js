async function loadLevel() {

    // Get the information from the URL
    const params = new URLSearchParams(window.location.search);

    // Get the level ID from the URL
    const levelID = params.get("id");

    // The ID of our Google spreadsheet
    const spreadsheetID = "1gg5hyZiUSGLVQuIhOqh3FOI9iR0oO2zdQwefgqPkvaE";

    // Ask Google Sheets for the Levels sheet
    const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:csv&sheet=Levels`;

    // Fetch the spreadsheet
    const response = await fetch(url);

    // Turn the response into text
    const data = await response.text();

    // Split the spreadsheet into rows
    const rows = data.split("\n");

    // Turn every spreadsheet row into a level object
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

    // Find the level that matches the ID in the URL
    const level = levels.find(level => level.levelID === levelID);

    console.log(level);

    // Put level data onto the page
    document.getElementById("level-name").textContent = level.name;
    document.getElementById("level-creator").textContent = level.creator;
    document.getElementById("level-rank").textContent = level.rank;
    document.getElementById("level-points").textContent = level.points;
    document.getElementById("level-verifier").textContent = level.verifier;
    document.getElementById("level-id").textContent = level.levelID;

    // Find the copy button
    const copyButton = document.getElementById("copy-id-button");

    // Copy the level ID when the button is clicked
    copyButton.addEventListener("click", () => {

        navigator.clipboard.writeText(level.levelID);

        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy ID";
        }, 1000);

    });

}

loadLevel();
