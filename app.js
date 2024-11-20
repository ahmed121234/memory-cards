//variables

const levels = {
  level1: 4,
  level2: 8,
  level3: 12
}

let currentLevel = null
let lives = 6
let moves = 0
let cardValues = []
let flippedCards = []

const landingPage = document.getElementById('landingPage')
const gamePage = document.getElementById('gamePage')
const cardsContainer = document.getElementById('cardsContainer')
const livesDisplay = document.getElementById('lives')
const movesDisplay = document.getElementById('moves')
const gameOverMessage = document.getElementById('gameOverMessage')
const levelCompleteMessage = document.getElementById('levelCompleteMessage')

// Function to start the game at a selected level

function startLevel(level) {
  currentLevel = level
  lives = 8
  moves = 0
  cardValues = generateCardValues(levels[level])
  flippedCards = []

  updateStats()
  generateCards()
  cardsContainer.style.pointerEvents = 'auto'
  landingPage.style.display = 'none'
  gamePage.style.display = 'block'
}

// Function to generate the cards based on the level

function generateCardValues(cardCount) {
  const values = []
  for (let i = 1; i <= cardCount / 2; i++) {
    values.push(i, i)
  }
  return values.sort(() => Math.random() - 0.5)
}

//function generateCards() {}

function generateCards() {
  cardsContainer.innerHTML = ''
  cardValues.forEach((value) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value
    card.addEventListener('click', flipCard)
    cardsContainer.appendChild(card)
  })
}

// Shuffle the card values randomly

//cardValues.sort()

// Create the card elements and append to the container

//const cardsContainer = document.getElementById()

// Function to handle flipping the card

//function flipCard() {}

// Check if two cards are flipped

// Function to check if the two flipped cards match

//function checkForMatch() {}

// Function to handle trying again after losing

//function restartGame() {}

// Function to move to the next level

//function nextLevel() {}

function flipCard() {
  if (flippedCards.length === 2) return

  this.textContent = this.dataset.value
  this.classList.add('flipped')
  flippedCards.push(this)

  if (flippedCards.length === 2) {
    moves++
    checkMatch()
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards
  if (card1.dataset.value === card2.dataset.value) {
    flippedCards = []
    checkWin()
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped')
      card1.textContent = ''
      card2.classList.remove('flipped')
      card2.textContent = ''
      flippedCards = []
      lives--
      updateStats()
      checkGameOver()
    }, 1000)
  }
}

function updateStats() {
  livesDisplay.textContent = lives
  movesDisplay.textContent = moves
}

function checkGameOver() {
  if (lives === 0) {
    gameOverMessage.style.display = 'block'
    cardsContainer.style.pointerEvents = 'none'
  }
}

function checkWin() {
  const flippedCount = document.querySelectorAll('.card.flipped').length
  if (flippedCount === cardValues.length) {
    levelCompleteMessage.style.display = 'block'
    cardsContainer.style.pointerEvents = 'none'
  }
}

function nextLevel() {
  const levelKeys = Object.keys(levels)
  const nextLevelIndex = levelKeys.indexOf(currentLevel) + 1

  if (nextLevelIndex < levelKeys.length) {
    currentLevel = levelKeys[nextLevelIndex]
    lives = 8
    moves = 0
    cardValues = generateCardValues(levels[currentLevel])
    flippedCards = []

    updateStats()
    generateCards()
    levelCompleteMessage.style.display = 'none'
    cardsContainer.style.pointerEvents = 'auto'
  } else {
    congratsMessage.style.display =
      "Congratulations! You've completed all levels!"
    resetGame()
  }
}

function resetGame() {
  currentLevel = null
  lives = 8
  moves = 0
  cardValues = []
  flippedCards = []

  landingPage.style.display = 'block'
  gamePage.style.display = 'none'
  gameOverMessage.style.display = 'none'
  levelCompleteMessage.style.display = 'none'
}

document.querySelectorAll('.levelBtn').forEach((button) => {
  button.addEventListener('click', () => startLevel(button.id))
})

document.getElementById('tryAgainBtn').addEventListener('click', resetGame)
document.getElementById('nextLevelBtn').addEventListener('click', nextLevel)
