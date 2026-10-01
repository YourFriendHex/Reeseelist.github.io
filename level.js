async function loadLevel() 
{

  //Take the parameters from the current URL and put them into a variable called params.
  const params = new URLSearchParams(window.location.search);

  //Gets teh level ID and puts it into variable named levelID
  const levelID = params.get("id"); 

  //Load data from level.json
  const response = await fetch("levels.json");

  //Convert json data into javascript and store in variable named levels
  const levels = await response.json();

  //Find the corresponding level id from the url in the json data
  /// "===" are they equal and the same type?
  const level = levels.find(level => level.levelID === levelID);

  //Print level ID, full json, and level specific data to console
  console.log(levelID);
  console.log(levels);
  console.log(level);

  //Put level data onto the page
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

    // Copy the ID to the clipboard
    navigator.clipboard.writeText(level.levelID);

    // Change the button text
    copyButton.textContent = "Copied!";

    //Run this after 1000 ms
    setTimeout(() => {
    copyButton.textContent = "Copy ID";
  }, 1000));
}

loadLevel();
