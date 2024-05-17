//-------DECLARING VARIABLES -------------
let myCardContainer = document.getElementById('cards-container');
let myCardTemplate = document.getElementById('card-template');
let data = null; // Variable to store the fetched data

//-------FETCHING THE DATA -------------
fetch('./data.json')
  .then((request) => {
    if (!request.ok) {
      console.log('Oops! Something went wrong.');
      return null;
    }

    return request.json();
  })
  .then((fetchedData) => {
    data = fetchedData; // Storing the fetched data in the 'data' variable
    console.log(data);
    generateCards('daily'); // Generate cards with daily data by default
  });

//----------- Function to generate and display cards----------------

function generateCards(timeframe) {
  // Clear any existing cards in the container by setting its inner HTML to an empty string
  myCardContainer.innerHTML = '';

  // Iterate over each item in the data array
  data.forEach((item) => {
    //this is the callback anonymous arrow function: (item) => {}

    let cardClone = myCardTemplate.cloneNode(true); // Clone the card template to create a new card element. This line creates a deep clone of the card template. true indicates that the clone should include all child nodes (i.e., a deep clone).
    /*let newNode = node.cloneNode(deep);deep: A boolean parameter. If true, the method performs a deep clone, copying all child nodes as well. If false, only the specified node is cloned, without any child nodes.
    In the displayCard function, cloneNode(true) is used to clone the entire card template, including all of its child elements. This allows you to modify the cloned card and display it with the updated data.*/

    cardClone.classList.remove('hidden'); // Remove the 'hidden' class from the cloned card to make it visible

    // Update the activity title in the cloned card with the current item's title
    cardClone.querySelector('.card__activity').textContent = item.title; ///Purpose: textContent is used to set or get the text content of an element. It only affects text nodes and does not parse HTML tags. Safety: It does not interpret HTML tags, so it is safer from a security standpoint (e.g., preventing XSS attacks).

    // Update the hours in the cloned card with the current hours for the selected timeframe
    cardClone.querySelector('.card__hours').textContent = item.timeframes[timeframe].current + 'hrs';

    // Update the previous hours in the cloned card with the previous hours for the selected timeframe
    cardClone.querySelector('.card__previous').textContent = 'Previous - ' + item.timeframes[timeframe].previous + 'hrs';

    if (cardClone.querySelector('.card__activity').textContent === 'Work') {
      cardClone.querySelector('.card__card_under').style.backgroundColor = 'var(--light-red-work)';
    }

    // Set background color and icon based on the title
    let bgColor, iconPath;
    switch (item.title) {
      case 'Work':
        bgColor = 'hsl(15, 100%, 70%)';
        iconPath = 'icon-work.svg';
        break;
      case 'Play':
        bgColor = 'hsl(195, 74%, 62%)';
        iconPath = 'icon-play.svg';
        break;
      case 'Study':
        bgColor = 'hsl(348, 100%, 68%)';
        iconPath = 'icon-study.svg';
        break;
      case 'Exercise':
        bgColor = 'hsl(145, 58%, 55%)';
        iconPath = 'icon-exercise.svg';
        break;
      case 'Social':
        bgColor = 'hsl(264, 64%, 52%)';
        iconPath = 'icon-social.svg';
        break;
      case 'Self Care':
        bgColor = 'hsl(43, 84%, 65%)';
        iconPath = 'icon-self-care.svg';
        break;
      default:
        bgColor = 'hsl(0, 0%, 90%)'; // Default color
        iconPath = 'default-icon.svg'; // Default icon
        break;
    }

    // Set background color
    cardClone.querySelector('.card__card_under').style.backgroundColor = bgColor;

    // Set icon
    let bgIcon = cardClone.querySelector('.card__bgIcon');
    bgIcon.style.backgroundImage = `url(./assets/images/${iconPath})`; //🐞🚩is important to give the path thinking this will be request from the root folder not from the script folder that is why only one dot was used.

    // Append the cloned card to the container element to display it on the page
    myCardContainer.appendChild(cardClone);
  });

  // Highlight the active button
  document.querySelectorAll('.profile__timeframeBtn').forEach((button) => {
    button.classList.remove('profile__active');
  });
  document.getElementById(timeframe).classList.add('profile__active');
}

// Adding event listeners
document.getElementById('daily').addEventListener('click', () => generateCards('daily'));
document.getElementById('weekly').addEventListener('click', () => generateCards('weekly'));
document.getElementById('monthly').addEventListener('click', () => generateCards('monthly'));

//////// OLD CODE ///////////////////////
