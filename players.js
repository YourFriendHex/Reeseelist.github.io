// Function to create tag colors
function tagColor(tag) {

    let hash = 0;

    // Turn each character into a number
    for (let i = 0; i < tag.length; i++) {

        hash = tag.charCodeAt(i) + ((hash << 5) - hash);

    }

    // Convert the number into a hexadecimal color
    const color = Math.abs(hash).toString(16).substring(0, 6);

    return "#" + color.padStart(6, "0");
}

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

        // Format the player tags and color them
        const tagHTML = tags.map(tag => {

            // Call tag color function to get tage color
            const color = tagColor(tag);

           return `
              <span class="player-tag" style="background-color: ${color};">
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
