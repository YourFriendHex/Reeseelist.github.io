async function loadLevels() {

    const spreadsheetID = "1gg5hyZiUSGLVQuIhOqh3FOI9iR0oO2zdQwefgqPkvaE";

    const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:csv&sheet=Levels`;

    const response = await fetch(url);

    const data = await response.text();

    const rows = data.split("\n");

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
