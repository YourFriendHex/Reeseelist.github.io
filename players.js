// Main function that loads players
async function loadPlayers() {

    // Get the player scores
    const players = await getPlayerScores();

    // Sort players from highest score to lowest score
    players.sort((a, b) => b.points - a.points);
    
    // Find the player list on the page
    const list = document.getElementById("player-list");

    // Create an entry for every player
    players.forEach((player, index) => {

        const playerElement = document.createElement("div");

        playerElement.classList.add("player");

        // Get player tags
        const tags = player.tags
        ? player.tags.split(",").map(tag => tag.trim())
        : [];

        // Get gradient for tags
        const gradientColors = player.gradient
        ? player.gradient.split(",").map(color => color.trim())
        : [];

        // Format the player tags and color them
        const tagHTML = tags.map((tag, index) => {

    // Get the three colors belonging to this tag
    const colors = gradientColors.slice(index * 3, index * 3 + 3);

    // If no colors were specified, use the generated tag color
    if (colors.length === 0) {
        colors.push(tagColor(tag));
    }

    // Create the CSS gradient
    const gradient = `linear-gradient(to right, ${colors.join(", ")})`;

    return `
        <span
            class="player-tag"
            style="
                background:
                    linear-gradient(white, white) padding-box,
                    ${gradient} border-box;
            "
        >
            ${tag}
        </span>
    `;

}).join("");

       
       playerElement.innerHTML = `
            <a href="playerdata.html?name=${encodeURIComponent(player.name)}" class="player-link">

            <div class="player-rank">
                #${index + 1}
            </div>

            <div class="player-name">
                ${player.name}
                ${tagHTML}
            </div>

            <div class="player-points">
                ${player.points} pts
            </div>

        </a>
    `;
        

        list.appendChild(playerElement);

    });
}



loadPlayers();
