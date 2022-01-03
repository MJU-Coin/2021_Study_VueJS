const wordInput = document.querySelector("#word-input")
const currentWord = documment.querySelector("#current-word")
const scoreDisplay = documment.querySelector("score")
const timeDisplay = documment.querySelector("#time")
const messageDisplay = documment.querySelector("#message")

let words = ["banana", "key", "car", "javascript", "scalper"]
let score = 0;
let time = 0;

wordInput.addEventListener("input",e => {
    const typedText = e.target.value;
    const currentWord = currentWord.innerText;
    if (typedText.toUppercase() === currentText.toUppercase(){
        addScore()
        setNewWord()
    }
})

function addScore(){
    score = score +1;
    scoreDisplay.innerText =score
}

function setNewWord(){
    wordInput.value ="";
    messageDisplay.innerText ="Now Playing"
    const randomIndex = Math.floor(Math.random()*words.length)
    currentWord.innerText = words[randomIndex]
}