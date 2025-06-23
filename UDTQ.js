const form = document.getElementById("formContainer");
const answerInput = document.getElementById("answer");

export const puzzleSong = document.getElementById("puzzleSong");

let enigmeResolue = false

form.addEventListener("submit", function(event) {
    event.preventDefault();
    checkSolution();
});

function checkSolution() {
    const victorySong = new Audio("victorySong.mp3")
    const answer = answerInput.value.trim().toLowerCase();
    const enigme = document.getElementById("enigmeBox")
    const header = document.querySelector(".header-banner")
    if (answer === "c") {
        enigmeResolue = true
        enigme.classList.add("hidden")
        document.body.classList.add("victory-background")
        header.classList.add("victory-background")

        const pseudoDisplay = document.getElementById("pseudoDisplay")
        pseudoDisplay.textContent = ""

        puzzleSong.pause()
        puzzleSong.currentTime = 0
        puzzleSong.loop = false

        victorySong.play()

        localStorage.removeItem("gameState") 
        localStorage.removeItem("enigmeCommencee")

        setTimeout(() => {
            lancerSequence(() => {

            });
        }, 1000);
    } else {
        document.body.classList.add("flash-red");
        setTimeout(() => document.body.classList.remove("flash-red"), 500);
    }
}

window.onload = () => {
    const enigmeCommencee = localStorage.getItem("enigmeCommencee");
    const musicSong = document.getElementById("musicSong");
    const indice = localStorage.getItem("indice")
    
    if (enigmeCommencee === "true" && !enigmeResolue) {
        document.querySelector(".image-container").classList.add("hidden");
        document.getElementById("dialogueBox").classList.add("hidden");
        document.getElementById("enigmeBox").classList.remove("hidden");
    
        // Rejouer la musique de puzzle
        puzzleSong.loop = true;
        musicSong.pause();
        puzzleSong.play();
    
        if(indice === "true") {
            document.getElementById("indiceButton").classList.add("hidden")
            document.getElementById("indice").classList.toggle("hidden")
        }
    }
}

window.checkSolution = checkSolution
