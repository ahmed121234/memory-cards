//variables
let flippedCards = []
let moves = 0
let lives = 7
let timer = 60
let timerInterval
let currentLevel = 'level1'
let cardValues = []
const levels = ['level1', 'level2', 'level3']

// Start the game at a specific level
function startLevel(level) {
  currentLevel = level
  lives = 7
  moves = 0
  flippedCards = []
  cardValues = generateCardValues(level)
  timer = 60

  updateStats()
  generateCards()
  startTimer()

  document.getElementById('landingPage').style.display = 'none'
  document.getElementById('gamePage').style.display = 'block'
  resetMessages()
}

// Generate card values for the level
function generateCardValues(level) {
  const numCards = level === 'level1' ? 4 : level === 'level2' ? 8 : 12
  const values = []
  for (let i = 1; i <= numCards / 2; i++) {
    values.push(i, i) // Create pairs
  }
  return shuffle(values)
}

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Update lives, moves, and timer stats
function updateStats() {
  document.getElementById('lives').textContent = lives
  document.getElementById('moves').textContent = moves
  document.getElementById('timer').textContent = `${timer}`
}

// Generate cards on the game board
function generateCards() {
  const container = document.getElementById('cardsContainer')
  container.innerHTML = '' // Clear existing cards
  cardValues.forEach((value) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value
    card.addEventListener('click', flipCard)
    container.appendChild(card)
  })
}

//card flip logic
function flipCard() {
  if (flippedCards.length === 2) return // Only two cards at a time

  this.classList.add('flipped')
  this.textContent = this.dataset.value
  flippedCards.push(this)

  if (flippedCards.length === 2) {
    moves++
    checkMatch()
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched')
    card2.classList.add('matched')
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
      if (lives === 0) checkGameOver()
    }, 1000)
  }
}

// Check if the game is a win
function checkWin() {
  const matchedCards = document.querySelectorAll('.card.matched').length
  if (matchedCards === cardValues.length) {
    clearInterval(timerInterval)
    document.getElementById('levelCompleteMessage').style.display = 'block'
  }
}

// Game over logic
function checkGameOver() {
  clearInterval(timerInterval)
  document.getElementById('gameOverMessage').style.display = 'block'
}

// Timer management
function startTimer() {
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timer--
    document.getElementById('timer').textContent = `${timer}`
    if (timer <= 0) checkGameOver()
  }, 1000)
}

// Move to the next level
function nextLevel() {
  const currentIndex = levels.indexOf(currentLevel)
  if (currentIndex + 1 < levels.length) {
    startLevel(levels[currentIndex + 1])
  } else {
    document.getElementById('congratsMessage').style.display = 'block'
  }
}

// Restart the game
function resetGame() {
  clearInterval(timerInterval)
  document.getElementById('gamePage').style.display = 'none'
  document.getElementById('landingPage').style.display = 'block'
}

// Event listeners
document.querySelectorAll('.levelBtn').forEach((button) => {
  button.addEventListener('click', () => startLevel(button.id))
})
document.getElementById('tryAgainBtn').addEventListener('click', resetGame)
document.getElementById('nextLevelBtn').addEventListener('click', nextLevel)
document.getElementById('restartGameBtn').addEventListener('click', resetGame)

//all game messages
function resetMessages() {
  document.getElementById('gameOverMessage').style.display = 'none'
  document.getElementById('levelCompleteMessage').style.display = 'none'
  document.getElementById('congratsMessage').style.display = 'none'
}
