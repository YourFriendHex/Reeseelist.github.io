console.log("JavaScript is running");
async function loadLevels() {
    try {
        const response = await fetch("levels.json");

        if (!response.ok) {
            throw new Error("Could not load levels.json");
        }

        const levels = await response.json();

        const list = document.getElementById("level-list");

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

    } catch (error) {
        console.error(error);
    }
}

loadLevels();
