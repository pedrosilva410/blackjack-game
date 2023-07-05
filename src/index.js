const startGameButton = document.getElementById("startGame");
const newCardButton = document.getElementById("newCard");
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el")
const chipsEl = document.getElementById("chips-el")
const player = {
	playerName: "",
	chips: 0
};
let cards = [];
let firstCard = 0;
let secondCard = 0;
let sum = 0;
let message = "";
let hasBlackJack = false;
let isAlive = true;

startGameButton.addEventListener("click", startGame);
newCardButton.addEventListener("click", drawCard);

function randomCard() {
	let randomCard = Math.floor(Math.random() * 13) + 1;
	if (randomCard === 1) {
		return 11;
	} else if (randomCard >= 11) {
		return 10;
	}
	else return randomCard
}

function startGame() {
	if (!player.playerName) {
		player.playerName = prompt("What's your name?")
		player.chips = 100

		playerEl.textContent = "Player: " + player.playerName;
		chipsEl.textContent = "Chips: " + player.chips;
	}
	let firstCard = randomCard();
	let secondCard = randomCard();
	cards = [firstCard, secondCard]
	let message = "";
	let hasBlackJack = false;
	let isAlive = true;

	sum = firstCard + secondCard;
	newCardButton.style.visibility = "visible";
	startGameButton.textContent = "New Game";

	if (sum < 21) {
		message = "Do you want to draw a new card?";
	} else if (sum === 21) {
		message = "You've got Blackjack!";
		newCardButton.style.visibility = "hidden";
		hasBlackJack = true;
	} else {
		isAlive = false;
		message = "Bad luck! You're out of the game!";
	}

	messageEl.textContent = message;
	cardsEl.textContent = "Cards: " + firstCard + " " + secondCard;
	sumEl.textContent = "Sum: " + sum;
	console.log("blackjack: " + hasBlackJack);
	console.log("is Alive: " + isAlive);
}

function drawCard() {
	if (hasBlackJack == false || isAlive == true) {
		let newCard = randomCard();
		sum = sum + newCard

		if (sum < 21) {
			message = "Do you want to draw a new card?";
		} else if (sum === 21) {
			message = "You've got Blackjack!";
			newCardButton.style.visibility = "hidden";
			hasBlackJack = true;
		} else {
			isAlive = false;
			message = "Bad luck! You're out of the game!";
			newCardButton.style.visibility = "hidden"
		}

		messageEl.textContent = message;
		cardsEl.textContent = cardsEl.textContent + " " + newCard;
		sumEl.textContent = "Sum: " + sum;
		console.log("blackjack: " + hasBlackJack);
		console.log("is Alive: " + isAlive);
	}
}
