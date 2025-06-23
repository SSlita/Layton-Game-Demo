import { dialogue } from "./dialogue-data.js"

const transitionSong = document.getElementById("transitionSong")
const music = document.getElementById("musicSong")

music.loop = true
music.play()

//import { puzzleSong } from '../enigme/la_traversee/la_traversee.js';

function lancerTransition() {
    music.pause()
    const transition = document.getElementById("transitionScreen")
    const room = document.querySelector(".image-container")
    const dialogueBox = document.getElementById("dialogueBox")
    const enigme = document.getElementById("enigmeBox")

    if (transition && room && transitionSong && enigme) {
        room.classList.add("hidden")
        dialogueBox.classList.add("hidden")
        transition.classList.add("active")
        transitionSong.play()

        localStorage.setItem("enigmeCommencee", "true")

        setTimeout(() => {
            transition.classList.remove("active")
            transitionSong.pause()
            afficherEnigme()
        }, 2500)
    }
}

function afficherEnigme() {
    puzzleSong.loop = true;
    puzzleSong.play();
    const enigme = document.getElementById("enigmeBox");
    enigme.classList.remove("hidden");
}

function lancerSequence(callback) {
    const screens = [
        document.getElementById("victoryScreen1"),
        document.getElementById("victoryScreen2"),
        document.getElementById("victoryScreen3"),
        document.getElementById("victoryScreen4"),
        document.getElementById("victoryScreen5")
    ];

    let index = 0;

    function showNextScreen() {
        if (index > 0) {
            screens[index - 1].style.display = "none";
        }

        if (index < screens.length) {
            screens[index].style.display = "block";
            index++;
            setTimeout(showNextScreen, 1500); // durée entre les écrans
        } else if (typeof callback === "function") {
            callback();
        }
    }

    showNextScreen();
}

function showExclamation(x, y) {
    const mark = document.getElementById("exclamationMark")
    mark.style.left = `${x - 15}px`
    mark.style.top = `${y - 40}px`
    mark.style.display = "block"

    mark.classList.remove("pop")
    void mark.offsetWidth
    mark.classList.add("pop")

    setTimeout(() => {
        mark.style.display = "none"
    }, 600)
}

function clickEnigme(e) {
    showExclamation(e.pageX, e.pageY) // Affiche le point !
    const songEnigme = new Audio("SWAV_19.wav")
    songEnigme.play()
    setTimeout(() => {
        lancerTransition();
    }, 800)
}

function showDialogue(lieu) {
    const ding = new Audio("SWAV_2.wav")
    const dialogueImg = document.getElementById("dialogueBox")

    if (dialogue[lieu]) {
        ding.play()
        dialogueImg.src = dialogue[lieu]
        dialogueImg.classList.remove("hidden")
    }
}

export function toggleHelp() {
    const popup = document.getElementById('helpPopup');
    popup.classList.toggle('hidden');
}

export function togglePopIndice() {
    const popup = document.getElementById("indicePopup")
    const enigmeBox = document.getElementById("enigmeBox")
    popup.classList.toggle("hidden")
    //enigmeBox.classList.toggle("hidden")
}

function closeIndice() {
    const popup = document.getElementById("indicePopup")
    popup.classList.toggle("hidden")
}

function showIndice() {
    const popup = document.getElementById("indicePopup")
    const indice = document.getElementById("indice")
    const indiceHelp = document.getElementById("indiceButton")
    popup.classList.toggle("hidden")
    indice.classList.toggle("hidden")
    indiceHelp.classList.add("hidden")
    localStorage.setItem("indice", "true")
    removeTwoMinutes()
}

window.clickEnigme = clickEnigme
window.showDialogue = showDialogue
window.lancerSequence = lancerSequence
window.toggleHelp = toggleHelp
window.togglePopIndice = togglePopIndice
window.closeIndice = closeIndice
window.showIndice = showIndice
