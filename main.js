let startGame = document.getElementById('wrap-visible')
let showElem = document.getElementById('wrap-hidden')
let yourHand = document.getElementById('yourHandCard')
let dealersHand = document.getElementById('dealersHandCard')
let yourhit = document.getElementById('hit')
let yourstay = document.getElementById('stay')
let results = document.getElementById('block')

let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]
let yourCount, dealersCount

startGame.addEventListener('click', start)

function start() {
   restart()
   yourCount = randomCard() + randomCard()
   dealersCount = randomCard() 
   yourHand.innerHTML = `Your Hand (${ yourCount })`
   dealersHand.innerHTML = `Dealer's Hand (${ dealersCount }) + hidden card`
   dealersCount+=randomCard()
   dealersHit()
}

function playerStay() {
   dealersHand.innerHTML = `Dealer's Hand (${ dealersCount })`
   yourhit.removeEventListener('click', playerHit)
   if (yourCount > dealersCount || dealersCount > 21 && yourCount <= 21) {
      results.innerHTML = 'You won!'
   } else if(yourCount === dealersCount) {
      results.innerHTML = 'Draw!'
   }  else {
      results.innerHTML = 'You lose!'
   }
   startGame.style.display = 'block'
}

function playerHit() {
   yourCount+=randomCard()
   if (yourCount <= 21) {
      yourHand.innerHTML = `Your Hand (${ yourCount })`
   } else {
      yourhit.removeEventListener('click', playerHit)
      yourHand.innerHTML = `Your Hand (${ yourCount })`
      results.innerHTML = 'You lose!'
      yourstay.removeEventListener('click', playerStay)
      dealersHand.innerHTML = `Dealer's Hand (${ dealersCount })`
   }
}

function dealersHit() {
   if (dealersCount <= 13) {
      dealersCount+=randomCard()
      dealersHit()
   } 
   if (dealersCount >= 13 && dealersCount <= 16) {
      if (randomInteger(0, 10) % 2 === 0) {
         dealersCount+=randomCard()
      }
   }
}

function restart() {
   yourhit.addEventListener('click', playerHit)
   yourstay.addEventListener('click', playerStay)
   yourCount = 0
   dealersCount = 0
   results.innerHTML = 'Hit or Stay?'
   showElem.style.display = 'block'
   startGame.style.display = 'none'
}

function randomCard() {
   let randCard = cards[Math.floor(Math.random() * cards.length)]
   return randCard
}

function randomInteger(min, max) {
   let rand = min - 0.5 + Math.random() * (max - min + 1);
   return Math.round(rand);
 }