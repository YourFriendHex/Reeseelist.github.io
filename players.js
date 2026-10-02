async function loadPlayers() {

    // Get the player scores
    const players = await getPlayerScores();

    // Find the player list on the page
    const list = document.getElementById("player-list");

    // Create an entry for every player
    players.forEach(player => {

        const playerElement = document.createElement("div");

        playerElement.classList.add("player");

        playerElement.innerHTML = `
            <div class="player-name">
                ${player.name}
            </div>

            <div class="player-points">
                ${player.points} pts
            </div>
        `;

        list.appendChild(playerElement);

    });
}

loadPlayers();
