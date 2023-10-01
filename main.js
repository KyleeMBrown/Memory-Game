//card Pngs
 let cardPngs  = [
'Images/BMO-v4.png',
'Images/Finn.png',
'Images/lemongrab_step_10.png',
'Images/Jake.png',
'Images/Marceline.png',
'Images/pb.png',
'Images/BMO-v4.png',
'Images/Finn.png',
'Images/lemongrab_step_10.png',
'Images/Jake.png',
'Images/Marceline.png',
'Images/pb.png'
 ]

 

//start screen 
const start = () => {
  var gameArea = document.getElementById('game-area')
  var gameStart = document.getElementById('game-start')

  gameStart.style.display= 'none'
  //bring in game  board
  gameArea.style.display= 'flex'
  gameArea.style.animation = '.5s fadeIn 1s ease both'
  //run Game
  memoryGame()
}

//Array to temporarily hold the CardsClicked
let cardsclicked  = []
//Array to hold the Matches
let matches = []
//Array to temporarily hold the Non Matches
let notMatch = []
let chosenPics = []

//Memory Game logic function
const memoryGame = () => {
  
  var cards = document.querySelectorAll('.card')

  //get the amount of random numbers equal to cardPng Array.length
  const uniqueRandomNumbers = generateUniqueRandomNumbers(12, 0, 11);

  //checknumbers are unique and random
  console.log(uniqueRandomNumbers);

  //iterate through each card
  for(let i = 0; i<cards.length;i++){
    cards[i].style.width = '13%';
    chosenPics.push(uniqueRandomNumbers[i])
   
    console.log(chosenPics[i])
    //add event listener to grab cards and animate on click
    cards[i].addEventListener('click', function() {

      cards[i].classList.toggle('animation')

      //toggle  animation class of in order to toggle on every click
      setTimeout(function(){
        cards[i].classList.toggle('animation');
    
      }, 250);
     
      //           if statements to hold only two cards at a time   //
      if (cardsclicked.length < 1) {
        //push selected card into array
      cardsclicked.push(cards[i])
     
      //wait to put url on card until flip animation toggle is done
      setTimeout(() => {
        cards[i].style.backgroundImage = 'url(' + cardPngs[chosenPics[i]] + ')';
      }, 300);
      
      //check cards clicked Array
      console.log(cardsclicked)
  
      } else if (cardsclicked.length < 2)  {
        //push  selected card to the Array
       cardsclicked.push(cards[i]) 
       cards[i].style.backgroundImage = 'url(' + cardPngs[chosenPics[i]] + ')';
      
       setTimeout(() => {
        cards[i].style.backgroundImage = 'url(' + cardPngs[chosenPics[i]] + ')';
      }, 300);

      //check cards clicked Array
       console.log(cardsclicked)
      
    
      var firstCard = cardsclicked[0].style.backgroundImage
      var secondCard = cardsclicked[1].style.backgroundImage
      
      //check that each background image was grabbed
      console.log(firstCard, secondCard);

      //check for matches
       check();
      //clear the clickedcards Array and match Array/reset card position
       clear();
       //check for win if cards = 12
       winCheck();

      } else  {
        return
      }
    })
  }
}

//check cards for matches
const check = () => {
  if (cardsclicked[0].style.backgroundImage === cardsclicked[1].style.backgroundImage) {
    console.log('match')
    //push to matches Array
    matches.push(cardsclicked[0])
    matches.push(cardsclicked[1])
    //check for successful Array push
    console.log(matches)
    //make matches leave the board
    cardsclicked[0].style.width='0'
    cardsclicked[1].style.width='0'
    cardsclicked[0].style.transition=' 1s width .5s ease'
    cardsclicked[1].style.transition=' 1s width .5s ease'
    
  } else {
    //push to notMatch Array for manipulation in clear()
    notMatch.push(cardsclicked[0])
    notMatch.push(cardsclicked[1])
    console.log(notMatch)
    }
 
  
}


const clear = () => {
  //immediately clear cardsclicked
  cardsclicked  = []

  /* wait 600ms to run flip animation and remove image on non matches
     so there is no interference with the original toggle on the cards animation 
     class as well as the clearing of the nonMatch Array*/

    setTimeout(function() {
      notMatch[1].classList.toggle('animation')
      notMatch[1].style.backgroundImage = ''
      notMatch[0].classList.toggle('animation')
      notMatch[0].style.backgroundImage = ''
    }, 600);

  //Toggle the animation class off in order to toggle back on
    setTimeout(function() {
      notMatch[1].classList.toggle('animation')
      notMatch[0].classList.toggle('animation')
    }, 700);

  /*Wait until the end to clear the notMatch Array in order to 
    allow manipulationo in  the above two functions*/
    setTimeout(function() {
      notMatch=[]
    }, 900);
 
  
}

//check for a win if match Array is full (===12)
const winCheck = () => {
  if (matches.length === 12) {
    alert('YOU WON!!!')
    var restartArea = document.getElementById('restart')
    restartArea.style.display='flex'
  }
  else {
   return
  }
}

//restart Game by refreshing page
const restart = () => {
  location.href = ''
}

//                            Random Number Generator

//Get Random numbers between two numbers using Math.floor(Math.random())
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Manipulate the RandomNumbers based on count */
function generateUniqueRandomNumbers(count, min, max) {
//check if count is usable and makes sense
  if (count > (max - min + 1)) {
    throw new Error("Cannot generate more unique numbers than the range allows.");
  }
//set an empty uniqueNumbers Array
  const uniqueNumbers = [];
  /*while the array is less than the inputed count,
    generate a random number*/
  while (uniqueNumbers.length < count) {
    const randomNum = getRandomNumber(min, max);
    //if the random number is not in the array push it
    if (!uniqueNumbers.includes(randomNum)) {
      uniqueNumbers.push(randomNum);
    }
  }
  //return array of unique numbers
  return uniqueNumbers;
}


