// create heading mix or match 
const  h1 = document.createElement('h1');
h1.innerHTML = 'Mix or Match';
var heading = document.getElementById('h1_section');
heading.appendChild(h1);
h1.classList.add('page-title');

// create gameContainer and append in the card section
var gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
var gameContainerCard = document.getElementById('card_section');
gameContainerCard.appendChild(gameContainer);
var gameInfoContainer = document.createElement('div');// create gameInfoContainer
var gameInfor = document.getElementById('gameInfo');
gameInfor.appendChild(gameInfoContainer);
gameInfoContainer.classList.add('game-info-container');

const gameInfo = document.createElement('div');// create gameInfo which includes time and flipscount.
gameInfoContainer.appendChild(gameInfo);

gameInfo.classList.add('game-info');
gameInfo.innerText = 'Time'; // add time in the gameinfo container.

const span = document.createElement('span');
span.id = 'time-remaining';
span.innerHTML = 60;
gameInfo.appendChild(span);

const gameInfo1 = document.createElement('div');// create flipscount which includes flipcounts.
gameInfoContainer.appendChild(gameInfo1);
gameInfo1.classList.add('game-info');
gameInfo1.innerHTML = 'flips';

const flips = document.createElement('span');
flips.id = 'flips';
flips.innerHTML = 0;
gameInfo1.appendChild(flips);



cardGenerator(2);
function cardGenerator(series_value) // cardGenerator function which generates the cards in the gameContainer.
{
    var data = document.getElementById('card_section').getAttribute("option"); // take reference from each card.
    if(data === series_value)
    {
        return false;
    } 
    else
    {
        gameContainer.innerHTML= " "; // empty game container when I start a new game of 3 and 4 series.
    }
    let card_arrays = [
        'images/apple.jpg', 'images/banana.jpg', 'images/orange.jpg','images/grapes.jpg','images/mango.png','images/pears.jpg','images/potato.jpg','images/tomato.jpg','images/guavawa.jpg','images/gobi.jpg','images/bengan.jpg', 'images/brocalli.jpg'
    ];
    var image = card_arrays.length;
    if(series_value == 3){
        image = 8;
    } else if(series_value == 4){
        image = 6;
    }
    var for2pics = [];
    // create images based on radiobutton.
    for(let i= 0; i < image; i++)
    {
        for(let j=0; j< series_value; j++)
        {
            let for2pics1 = {
                backimg : 'images/download.png',
                frontimg : card_arrays[i]
            }
            for2pics.push(for2pics1);
        }
        
    }
    
    // create card and append it dynamically.
    for2pics.forEach(function(current_ele)
    {
       var card = document.createElement('div');
       gameContainer.appendChild(card);
       card.classList.add('card');
       var backcard = document.createElement('div');
       card.appendChild(backcard);
       backcard.classList.add('card-back');
       backcard.classList.add('card-face'); 
       var frontcard = document.createElement('div');
       card.appendChild(frontcard);
       frontcard.classList.add('card-front');
       frontcard.classList.add('card-face');
       var backimg = document.createElement('img');
       backimg.src = current_ele.backimg;
       backcard.appendChild(backimg);
       backimg.classList.add('cob-web');
       var frontimg = document.createElement('img');
       frontimg.src = current_ele.frontimg;
       frontcard.appendChild(frontimg);
       frontimg.classList.add('card-value');
       frontimg.classList.add('front'); 
    })
    document.getElementById('card_section').setAttribute("option", series_value); 
}
// create a class which includes all variables and function for cardgame.
    class MixOrMatch {
        constructor(totalTime, cards, series_value){
            this.cardItems = []; 
            this.cardsArray = cards;
            this.totalTime = totalTime;
            this.timeRemaining = totalTime;
            this.timer = document.getElementById('time-remaining');
            this.ticker = document.getElementById('flips');
            this.series_value = series_value;
            console.log(this.series_value);
            this.hasflipCard = false;
        }
// game start function    
        startGame() {
            this.cardToCheck = null;
            this.totalClicks = 0;
            this.timeRemaining = this.totalTime;
            this.matchedCards = [];
            this.cardItems = [];
            this.busy = true;
            setTimeout(() => {
                this.shuffleCards();
                this.countDown = this.startCountDown();
                this.busy = false;
            },500);
            this.hideCards();
            this.timer.innerText = this.timeRemaining;
            this.ticker.innerText = this.totalClicks;
        }
// hideCard function for hide the card.    
        hideCards() {
            this.cardsArray.forEach(card => {
                card.classList.remove('visible');
                card.classList.remove('matched');
            })
        }
// flipcard function        
        flipCard(card){
            if(this.series_value == 2)
            {
                if(this.canFlipCart(card)) // function to check whether a card is flip or not.
                {
                    this.totalClicks++;
                    this.ticker.innerText = this.totalClicks;
                    card.classList.add('visible');
                        if(this.cardToCheck)
                        {
                            this.checkForCardMatch(card);
                        }
                        else
                        {
                            this.cardToCheck = card;
                        }
                }
            }
            else if(this.series_value == 3)
            {
            if(this.canFlipCart(card) && this.cardItems.length < 3)
            {  
               this.totalClicks++;
               this.ticker.innerText = this.totalClicks;
               card.classList.add('visible');
               this.cardItems.push(card);
               console.log(this.cardItems[0]);
                if(this.cardItems.length === 3)
                {
                    if(this.getCardType(this.cardItems[0]) === this.getCardType(this.cardItems[1]) && this.getCardType(this.cardItems[0]) === this.getCardType(this.cardItems[2]))
                    {
                        this.cardMatch3(this.cardItems[0], this.cardItems[1], this.cardItems[2])
                    }
                    else 
                    {
                    this.cardMisMatch3(this.cardItems[0], this.cardItems[1], this.cardItems[2])
                    }
                    this.cardItems = [];
                }  
           }
           }
              else {
                  if(this.canFlipCart(card) && this.cardItems.length < 4)
                  { 
                    this.totalClicks++;
                    this.ticker.innerText = this.totalClicks;
                    card.classList.add('visible');
                    this.cardItems.push(card);
                    console.log(this.cardItems[0]);
                    if(this.cardItems.length === 4)
                    {
                    this.card1 = this.getCardType(this.cardItems[0]);
                    this.card2 = this.getCardType(this.cardItems[1]);
                    this.card3 = this.getCardType(this.cardItems[2]);
                    this.card4 = this.getCardType(this.cardItems[3]);
                
                if(this.card1 === this.card2 && this.card1 === this.card3 && this.card1 === this.card4)
                {
                    this.cardMatch4(this.cardItems[0], this.cardItems[1], this.cardItems[2], this.cardItems[3]);
                }
                else {
                   this.cardMisMatch4(this.cardItems[0], this.cardItems[1], this.cardItems[2], this.cardItems[3]);
                }
                this.cardItems = [];
               }
                  }
            }
           }
    
        checkForCardMatch(card){
            if(this.series_value == 2){
            if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
               this.cardMatch(card, this.cardToCheck);
            }else{
              this.cardMisMatch(card, this.cardToCheck);
            }
            this.cardToCheck = null;
            }
        }
        getCardType(card){
            return card.getElementsByClassName('card-value')[0].src;
         }
        shuffleCards(){
            for(let i = this.cardsArray.length - 1; i > 0; i--){
                let randIndex = Math.floor(Math.random() * (i+1));
                this.cardsArray[randIndex].style.order = i;
                this.cardsArray[i].style.order = randIndex;
            }
        }
    
        canFlipCart(card) {
            if(this.series_value == 2){
            return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
            }
            else if(this.series_value == 3){
                return !this.busy && !this.matchedCards.includes(card);
            }
            else {
                return !this.busy && !this.matchedCards.includes(card);
            }
        }
        
        cardMatch(card1, card2){
           this.matchedCards.push(card1);
           this.matchedCards.push(card2);
           card1.classList.add('matched');
           card2.classList.add('matched');
           if(this.matchedCards.length === this.cardsArray.length){
               this.victory();
           }
        }
    
        cardMisMatch(card1, card2){
           this.busy = true;
           setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
           }, 1000);
        }

        cardMatch3(card1, card2, card3){
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            this.matchedCards.push(card3);
            card1.classList.add('matched');
            card2.classList.add('matched');
            card3.classList.add('matched');
            if(this.matchedCards.length === this.cardsArray.length){
                this.victory();
            }
         }
     
         cardMisMatch3(card1, card2, card3){
            this.busy = true;
            setTimeout(() => {
             card1.classList.remove('visible');
             card2.classList.remove('visible');
             card3.classList.remove('visible');
             this.busy = false;
            }, 2000);
         }

         cardMatch4(card1, card2, card3, card4){
            this.matchedCards.push(card1);
            this.matchedCards.push(card2);
            this.matchedCards.push(card3);
            this.matchedCards.push(card4);
            card1.classList.add('matched');
            card2.classList.add('matched');
            card3.classList.add('matched');
            card4.classList.add('matched');
            if(this.matchedCards.length === this.cardsArray.length){
                this.victory();
            }
         }
     
         cardMisMatch4(card1, card2, card3, card4){
            this.busy = true;
            setTimeout(() => {
             card1.classList.remove('visible');
             card2.classList.remove('visible');
             card3.classList.remove('visible');
             card4.classList.remove('visible');
             this.busy = false;
            }, 2000);
         }
        
        startCountDown(){
            return setInterval(() => {
                this.timeRemaining--;
                this.timer.innerText = this.timeRemaining;
                if(this.timeRemaining === 0){
                    this.gameOver();
                }
            }, 1000);
        }
    
        gameOver(){
            clearInterval(this.countDown);
            alert('Game is over');
            this.matchedCards = [];
            this.cardsArray.forEach(card => {
                card.classList.remove('matched');
                card.classList.remove('visible');
            })
            this.totalClicks = 0;
        
        }
    
        victory(){
            clearInterval(this.countDown);
            alert('You have won the match');
            this.matchedCards = [];
            this.cardsArray.forEach(card => {
                card.classlist.remove('matched');
                card.classList.remove('visible');
            })
            this.totalClicks = 0;
           
        }
        
    
    }
    let game;
    var radioBtn = Array.from(document.getElementsByClassName("series-radio"));
    radioBtn.forEach(current_elem => {
        current_elem.addEventListener('click', () => {
            clearInterval(this.countDown);
            totalClicks = 0;
            if (current_elem.checked) {
                var series_val = current_elem.value;
                cardGenerator(series_val);  
                cards = Array.from(document.getElementsByClassName('card'));
                console.log(cards);
                gameStart(cards);
                game = new MixOrMatch(60, cards, series_val)

            }
        })
     });
     const helpBtn = document.getElementById('help');
     helpBtn.addEventListener('click', () => {
         alert(
        `         1: first check radio button
         2: then click on new button to game start
         3: then click on each card to flip and match it with previous card
         4: To see the solution of the game click on show button`)
     })
     
     
     function gameStart(cards){
     console.log(cards);
    //  let game = new MixOrMatch(60, cards, series_val);
     var showBtn = document.getElementById('show');
     var newBtn = document.getElementById('new-game');
     newBtn.addEventListener('click',() => {
         game.startGame();
         alert('New Game is Start');
     })
    showBtn.addEventListener('click',() =>{
        cards.forEach(card => {
            card.classList.add('visible');
        })
    })
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
         });
    });
}