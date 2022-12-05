// Inicialización de variables asignadas a objetos del DOM
const welcomePanel = document.getElementById('welcome-panel')
const buttonStart = document.getElementById('button-start')
const playPanel = document.getElementById('play-panel')
const currentWord = document.getElementById('current-word')
const inputUserText = document.getElementById('input-user-text')
const buttonSubmitText = document.getElementById('button-submit-text')
const countdownTime = 10
const correctInputReward = document.getElementById('correct-input-reward')
const timer = document.getElementById('timer')
const scoreCount = document.getElementById('score-count')
const buttonRestart = document.getElementById('button-restart')
const finishPanel = document.getElementById('finish-panel')
const endingText = document.getElementById('ending-text')
const scoreShow = document.getElementById('score-show')
const buttonAgain = document.getElementById('button-again')
buttonStart.focus()

// Inicialización de variables usadas para las funciones del programa
let availableWords = []
let guessedWords = []
let randomIndex = Math.floor(Math.random() * availableWords.length)
currentWord.textContent = availableWords[randomIndex]
let wordWasGuessed = true
let timeRanOut = false


// Función que hace reset de booleano sobre palabra adivinada, reset del campo
// input del usuario, busca nueva palabra a mostrar y reinicia el contador.
function resetValues() {
    wordWasGuessed = true
    randomIndex = Math.floor(Math.random() * availableWords.length)
    currentWord.textContent = availableWords[randomIndex]
    timer.textContent = countdownTime
    inputUserText.value = ''
}
function startGame() {
    welcomePanel.classList.toggle('inactive-panel')
    playPanel.classList.toggle('inactive-panel')   
    availableWords = dictionary_array.map(value => value)    
    inputUserText.focus()
    resetValues()
    countdown()
}
function submitText(event) {
    event.preventDefault()
    if (inputUserText.value == currentWord.textContent) {        
        availableWords.splice(randomIndex, 1)             
        guessedWords.push(currentWord.textContent)
        resetValues()
        scoreCount.textContent++    
        showCorrectInputReward()         
        if (!availableWords.length) {
            endingText.textContent = 'There are no more words left! 🛫'
            finishGame()
        }
    } else {
        wordWasGuessed = false
        endingText.textContent = 'You mistyped the word 🥀'
        finishGame()
    }
}
function finishGame() {
    playPanel.classList.add('inactive-panel')
    finishPanel.classList.remove('inactive-panel')
    buttonAgain.focus()
    scoreShow.textContent = scoreCount.textContent       
}
function againGame() {
    welcomePanel.classList.toggle('inactive-panel')
    finishPanel.classList.toggle('inactive-panel')
    buttonStart.focus()  
    scoreCount.textContent = 0 
}
function countdown() {
    let intervalCode1 = setInterval(() => {
        if (timer.textContent >= 1) {
            timer.textContent--
            if (timer.textContent == 0) {                
                clearInterval(intervalCode1)
                timeRanOut = true 
                endingText.textContent = 'Time ran out of your hands ⌛'               
                finishGame()
            } else if (!wordWasGuessed) {
                clearInterval(intervalCode1)                
            }
        }
    }, 1000)
    return intervalCode1
}
function showCorrectInputReward() {    
    correctInputReward.classList.add('correct-input-reward-visible');       
    setTimeout(() => {
        correctInputReward.classList.remove('correct-input-reward-visible');        
    }, 800)    
}
// function restartGame() {
//     welcomePanel.classList.toggle('inactive-panel')
//     playPanel.classList.toggle('inactive-panel')       
//     buttonStart.focus()
//     scoreCount.textContent = 0
// }


buttonStart.addEventListener('click', startGame)
buttonSubmitText.addEventListener('click', submitText)
buttonAgain.addEventListener('click', againGame)
// buttonRestart.addEventListener('click', restartGame)




