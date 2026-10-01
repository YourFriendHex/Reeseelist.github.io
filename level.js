//Take the parameters from the current URL and put them into a variable called params.
const params = new URLSearchParams(window.location.search);

//Gets teh level ID and puts it into variable named levelID
const levelID = params.get("id"); 

//Print level ID to console
console.log(levelID);

