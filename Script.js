//Card Variables
const Colors = [ "Hearts", "Spades", "Clubs", "Diamonds" ];
const Value = [ "Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
const Point = [ 1,10,10,10,10,9,8,7,6,5,4,3,2];

//Game Variables

let gameStarter = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let playerScore = 0;
let dealerScore = 0;
let Deck = [];

//Card Class

class Card
{
  constructor(colors, value, point)
  {
    this.colors = colors;
    this.value = value;
    this.point = point;
    this.path = `./Cards/${colors}${value}.png`
    this.id = colors + value;
  }
}

//Dom Variables

let newGameButton = document.getElementById("newGame");
let StayButton = document.getElementById("Stay");
let HitButton = document.getElementById("HitCard");
let playAgainButton = document.getElementById("playAgain");

//GameStart()

function GameStart() {
  
  gameStarter = true;
  gameOver = false;
  playerWon = false;

  CreateDeck();
  Shuffle();
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  showDealer();
  showPlayer();
  newGameButton.style.visibility = "hidden";
  StayButton.style.visibility = "visible";
  HitButton.style.visibility = "visible";

}

//Display Card Function

function DisplayCard(path, target, id)
{
  let CardImg = document.createElement('img');
  CardImg.src = path;
  CardImg.width = 100;
  CardImg.height = 150;
  CardImg.className = 'bg-white';
  CardImg.id = id;
  CardImg.classList.add = 'card'
  document.getElementById(target).appendChild(CardImg);
}

//Players Functions

function showDealer(){
  for(i = 0; i < dealerCards.length; i++)
  {
    let founCard = dealerCards[i];
    if(i == 1)
    {
      DisplayCard("./Cards/Back.png", "dealerHand", founCard.id);
    }
    else
    { 
      DisplayCard(founCard.path, "dealerHand", founCard.id);
    }
  }
  dealerScore = Score(dealerCards);
  document.getElementById("DealerHand").style.visibility = "visible";
  document.getElementById("DealerPoint").style.visibility = "visible";
  document.getElementById("DealerPoint").innerHTML = "Dealer Score: " + dealerScore;
  
}

function showHiddenCard()
{
  for(i = 0; i < dealerCards.length; i++)
  {
    let founCard = dealerCards[i];
    if(i == 1)
    {
      document.getElementById(founCard.id).src = founCard.path;
    }
  }
}

function HitCardToDealer(){
  let dealercard = getNextCard();
  dealerCards.push(dealercard);
  DisplayCard(dealercard.path, "dealerHand");
  dealerScore = Score(dealerCards);
  document.getElementById("DealerPoint").innerHTML = "Dealer Score: " + dealerScore;
}

//Player Functions

function showPlayer(){
  playerCards.forEach(card => {
    DisplayCard(card.path, "playerHand");
  });
  playerScore = Score(playerCards);
  document.getElementById("yourHand").style.visibility = "visible";
  document.getElementById("playerPoint").style.visibility = "visible";
  document.getElementById("playerPoint").innerHTML = "Player Score: " + playerScore;

}
function HitCardToPlayer(){
  if(playerScore < 21)
  {
    let foundCard = getNextCard();
    playerCards.push(foundCard);
    DisplayCard(foundCard.path, "playerHand");
    playerScore = Score(playerCards);
    document.getElementById("playerPoint").innerHTML = "Player Score: "+ playerScore;
  }
  else
  {
    dealerWin();
  }
}

//Deck Functions

function CreateDeck()
{
    for(let i = 0; i < Colors.length; i++)
    {
        for(let x = 0; x < Value.length; x++)
        {
            Deck.push(new Card(
                Colors[i],
                Value[x],
                Point[x]
            ));
        }
    }
}
function Shuffle()
{
    for(let i = 0; i < Deck.length; i++)
    {
        let safe = Deck[i];
        let temp = Math.floor(Math.random() * Deck.length);
        Deck[i] = Deck[temp];
        Deck[temp] = safe;
    }
}
function getNextCard() 
{
  return Deck.shift();
}

//Score

function Score(cardScore) 
{
  let score = 0;
  let hasAce = false;
  cardScore.forEach(x =>{ score += x.point });
  for(item in cardScore)
  {
    if (item.value === "Ace") {
      hasAce = true;
    }
    if (hasAce && score <= 11) {
      return score + 10;
    }
  }
    return score;
}

//End Game

function checkForEndOfGame() {
  if (gameOver == false) 
  {
    showHiddenCard();
    //let the dealer take cards
    while (playerScore <= 21 && dealerScore <= 21) 
    {
      HitCardToDealer();
    }
  }
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    dealerWin();
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
    playerWin();
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
      playerWin();
    } else {
      playerWon = false;
      dealerWin();
    }
  }
}

//Win/Lose Function

function dealerWin(){
  if(playerWon == false)
  {
    document.getElementById("Win").innerHTML = "YOU LOOSEE";
    HitButton.remove();
    StayButton.remove();
    playAgainButton.style.visibility = "visible";
  }
}

function playerWin()
{
  if(playerWon == true)
  {
    document.getElementById("Win").innerHTML = "CONGRATULATIONS, YOU WON.";
    HitButton.remove();
    StayButton.remove();
    playAgainButton.style.visibility = "visible";
  }
}

//New Game

function PlayAgain(){
  location.reload();
}