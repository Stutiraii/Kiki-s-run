document.addEventListener('DOMContentLoaded', function () {
    // Call the function to display the leaderboard
    showleaderBoard();
});

function showleaderBoard() {
    // Retrieve all user keys from local storage
    var allUserKeys = Object.keys(localStorage);

    // Filter out non-user keys
    var allUsers = allUserKeys.filter(function (key) {
        return localStorage.hasOwnProperty(key) && key !== 'allUsers';
    }).map(function (key) {
        return JSON.parse(localStorage.getItem(key));
    });

    // Sort users based on scores in descending order
    allUsers.sort(function (a, b) {
        return b.score - a.score;
    });

   
    var rankingDiv = document.getElementById("leaderBoard");

    // Create a variable that will hold the HTML for the rankings table
    var htmlStr = "";

    // Add a heading
    htmlStr += "<h1>Leaderboard</h1>";

    // Add the table tag
    htmlStr += "<table>";

    // Add table header
    htmlStr += "<tr>";
    htmlStr += "<th>Rank</th>";
    htmlStr += "<th>Username</th>";
    htmlStr += "<th>Score</th>";
    htmlStr += "</tr>";

    allUsers.forEach(function (user, index) {
        // Add table row for each user
        htmlStr += "<tr>";
        htmlStr += "<td>" + (index + 1) + "</td>"; // Rank
        htmlStr += "<td>" + user.username + "</td>"; // Username
        htmlStr += "<td>" + user.score + "</td>"; // Score
        htmlStr += "</tr>";
    });

    // Finish off the table
    htmlStr += "</table>";

    // Set the HTML content of the rankingDiv
    rankingDiv.innerHTML = htmlStr;
}
