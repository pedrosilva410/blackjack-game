const startGameButton = document.getElementById("startGame");
const newCardButton = document.getElementById("newCard");
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const tableCardsEl = document.getElementById("tableCards-el")
const playerEl = document.getElementById("player-el")
const chipsEl = document.getElementById("chips-el")
const player = {
	playerName: "",
	chips: 0
};
let cards = [];
let tableCards = [];
let firstCard = 0;
let secondCard = 0;
let sum = 0;
let tableSum = 0;
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
	startGameButton.style.visibility = "hidden";
	if (!player.playerName) {
		player.playerName = prompt("What's your name?")
		player.chips = 100

		playerEl.textContent = "Player: " + player.playerName;
	}

	if (cards.length < 2) {
		let bet = prompt('how much do you want to bet (chips: ' + player.chips + ')')
		player.chips = player.chips - bet;
		chipsEl.textContent = "Chips: " + player.chips;
	}

	let firstCard = randomCard();
	let secondCard = randomCard();
	cards = [firstCard, secondCard];
	let tableFirstCard = randomCard();
	let tableSecondCard = randomCard();
	tableCards = [tableFirstCard, tableSecondCard];
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
		startGameButton.style.visibility = "visible";
		player.chips = player.chips + bet * 2
		hasBlackJack = true;
	} else {
		startGameButton.style.visibility = "visible";
		isAlive = false;
		message = "Bad luck! You're out of the game!";
	}

	messageEl.textContent = message;
	cardsEl.textContent = "Cards: " + firstCard + " " + secondCard;
	tableCardsEl.textContent = "Table Cards: " + tableSecondCard + " " + tableSecondCard;
	sumEl.textContent = "Sum: " + sum;
	console.log("blackjack: " + hasBlackJack);
	console.log("is Alive: " + isAlive);
}

function drawCard() {

	if (hasBlackJack == false || isAlive == true) {
		let newCard = randomCard();
		let newTableCard = randomCard();
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
		tableCardsEl.textContent = tableCardsEl.textContent + " " + newTableCard;
		sumEl.textContent = "Sum: " + sum;
		console.log("blackjack: " + hasBlackJack);
		console.log("is Alive: " + isAlive);
	}
}
