async function loadLevels() {

    // Get the levels from Google Sheets
    const levels = await getSheet("Levels");

    // Find the list on the webpage
    const list = document.getElementById("level-list");

    // Create an entry for every level
    levels.forEach(level => {

        const levelElement = document.createElement("div");
        levelElement.classList.add("level");

        levelElement.innerHTML = `
            <a href="level.html?id=${level.levelID}" class="level-link">

                <div class="rank">#${level.rank}</div>

                <div class="level-info">
                    <div class="level-name">${level.name}</div>
                    <div class="creator">by ${level.creator}</div>
                </div>

                <div class="points">
                    ${level.points} pts
                </div>

                <div class="verifier">
                    Verified by ${level.verifier}
                </div>

            </a>
        `;

        list.appendChild(levelElement);
    });
}

loadLevels();
