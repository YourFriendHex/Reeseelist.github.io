async function loadLevel() {

    // Get the information from the URL
    const params = new URLSearchParams(window.location.search);

    // Get the level ID from the URL
    const levelID = params.get("id");

    // Get all levels from Google Sheets
    const levels = await getLevels();

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
