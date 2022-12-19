function displayHelp() {

    let helpdiv = document.getElementById("help");

    if (helpdiv.style.display === "block") {
        helpdiv.style.display = "none";
    } else {
        helpdiv.style.display = "block";
    }

}

function undisplayHelp() {
    let helpdiv = document.getElementById("help");

    if (helpdiv.style.display === "block") {
        helpdiv.style.display = "none";
    }
}