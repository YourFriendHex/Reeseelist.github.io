async function loadPlayer() {

    // Get the player's name from the URL
    const params = new URLSearchParams(window.location.search);
    const playerName = params.get("name");

    // Get all of our data
    const players = await getPlayers();
    const completions = await getCompletions();
    const levelRows = await getSheet("Levels");

    // Turn the level rows into level objects
    const levels = levelRows.map(row => {

        return {
            levelID: row[0],
            name: row[1],
            rank: Number(row[2]),
            points: Number(row[3]),
            creator: row[4],
            verifier: row[5]
        };

    });

    // Find this player
    const player = players.find(player =>
        player.name === playerName
    );

        // Find the player's tags
       // Turn the player's tag string into an array
const tags = player.tags
    ? player.tags.split(",").map(tag => tag.trim())
    : [];

// Turn the gradient string into an array of colors
const gradientColors = player.gradient
    ? player.gradient.split(",").map(color => color.trim())
    : [];

// Find the tag container
const tagContainer = document.getElementById("player-tags");

// Create the player's tags
tags.forEach((tag, index) => {

    // Get the three colors belonging to this tag
    const colors = gradientColors.slice(index * 3, index * 3 + 3);

    // If no custom colors were specified, use the generated tag color
    if (colors.length === 0) {
        colors.push(tagColor(tag));
    }

    // Create the CSS gradient
    const gradient =
        `linear-gradient(to right, ${colors.join(", ")})`;

    // Use the first color for the text
    const textColor = colors[0];

    // Create the tag element
    const tagElement = document.createElement("span");

    tagElement.classList.add("player-tag");

    tagElement.textContent = tag;

    tagElement.style.color = textColor;

    tagElement.style.background =
        `linear-gradient(white, white) padding-box,
         ${gradient} border-box`;

    tagContainer.appendChild(tagElement);

});

    // Find this player's completed levels
    const playerCompletions = completions.filter(completion =>
        completion.player === playerName
    );

    // Find the actual level information for each completion
    const completedLevels = playerCompletions.map(completion => {

        return levels.find(level =>
            level.levelID === completion.levelID
        );

    }).filter(level => level !== undefined);


    // Calculate the player's total points
    let totalPoints = 0;

    completedLevels.forEach(level => {
        totalPoints += level.points;
    });


    // Display the player's name
    document.getElementById("player-name").textContent = player.name;

    // Display their total points
    document.getElementById("player-points").textContent =
        `${totalPoints} points`;


    // Find the completed levels section
    const list = document.getElementById("completed-levels");

    // Check if the player has no completed levels
    if (completedLevels.length === 0) {

        list.textContent = "This player has not completed any levels yet.";

    }


    // Create an entry for every completed level
    completedLevels.forEach(level => {

        const levelElement = document.createElement("div");

        levelElement.classList.add("level");

        levelElement.innerHTML = `
            <a href="level.html?id=${level.levelID}" class="level-link">

                <div class="rank">
                    #${level.rank}
                </div>

                <div class="level-info">

                    <div class="level-name">
                        ${level.name}
                    </div>

                </div>

                <div class="points">
                    ${level.points} pts
                </div>

            </a>
        `;

        list.appendChild(levelElement);

    });
}

loadPlayer();
