//-------DECLARING VARIABLES -------------
let myBillAmount = document.getElementById('bill-amount');
let my5Btn = document.getElementById('5%-btn');
let my10Btn= document.getElementById('10%-btn');
let my15Btn = document.getElementById('15%-btn');
let my20Btn= document.getElementById('20%-btn');
let my30Btn = document.getElementById('30%-btn');
let my50Btn = document.getElementById('50%-btn');
let myNumberOfPeople = document.getElementById('num-people');
let myTipAmount = document.getElementById('tip-amount');
let myResetBtn = document.getElementById('reset-button');









//-------     xxxxxxxx    -------------


//----------- Function to generate and display cards----------------

function generateCards(timeframe) {
  // Clear any existing cards in the container by setting its inner HTML to an empty string
  myCardContainer.innerHTML = '';


// Adding event listeners
// Adding event listeners
document.getElementById('bill-amount').addEventListener('input', () => handleBillInput());
document.getElementById('5%-btn').addEventListener('click', () => handleTipButtonClick('5%-btn'));
document.getElementById('10%-btn').addEventListener('click', () => handleTipButtonClick('10%-btn'));
document.getElementById('15%-btn').addEventListener('click', () => handleTipButtonClick('15%-btn'));
document.getElementById('20%-btn').addEventListener('click', () => handleTipButtonClick('20%-btn'));
document.getElementById('30%-btn').addEventListener('click', () => handleTipButtonClick('30%-btn'));
document.getElementById('50%-btn').addEventListener('click', () => handleTipButtonClick('50%-btn'));
document.getElementById('num-people').addEventListener('input', () => handlePeopleInput());
document.getElementById('reset-button').addEventListener('click', () => handleReset());



/////// ---- PSEUDO CODE -----///////////////////////
/*
//sTEP 1: make a list of all the HTMLelemnts I need to get:
1. Bill input: id="bill-amount"

2.Buttons:
id="5%-btn"
id="10%-btn"
id="15%-btn"
id="20%-btn"
id="30%-btn"
id="50%-btn"

3.# of people input: id="num-people"

4.  id="tip-amount"
5. id="total-amount"
6. id="reset-button"


*/

/////// ---- TOOLS -----///////////////////////
// Adding event listeners
/*
document.getElementById('daily').addEventListener('click', () => generateCards('daily'));
document.getElementById('weekly').addEventListener('click', () => generateCards('weekly'));
document.getElementById('monthly').addEventListener('click', () => generateCards('monthly'));

*/
