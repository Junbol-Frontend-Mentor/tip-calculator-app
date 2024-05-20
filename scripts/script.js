//-------DECLARING VARIABLES -------------
let myBillAmount = document.getElementById('bill-amount');
let my5Btn = document.getElementById('5btn');
let my10Btn = document.getElementById('10btn');
let my15Btn = document.getElementById('15btn');
let my20Btn = document.getElementById('20btn');
let my30Btn = document.getElementById('30btn');
let my50Btn = document.getElementById('50btn');
let numberOfPeopleInput = document.getElementById('num-people'); // ✅ Renamed to avoid confusion with variable name
//let myTipAmount = document.getElementById('tip-amount');
//let myResetBtn = document.getElementById('reset-button');

//------- DEFINING FUNCTIONS    -------------

let billInput = 0;
let tipAmount = 0;
let tipAmountTotal = 0;
let numberOfPeople = 0;
let total = 0;

//----------- callCalculateTipAmount--------------
const callCalculateTipAmount = () => {
  // this function needed to be move up here before its calling bellow
  const tipAmountElement = document.getElementById('tip-amount'); // ✅ Access the tip amount element
  if (!isNaN(billInput) && billInput > 0 && !isNaN(tipAmount) && tipAmount > 0 && !isNaN(numberOfPeople) && numberOfPeople > 0) {
    calculateTipAmount(); // ✅ Call the function to calculate and display the tip amount
  } else {
    tipAmountElement.innerHTML = '0.00'; // ✅ Reset or clear the tip amount display if inputs are incomplete
  }
};

//----------- handleBillInput---------------
const handleBillInput = (event) => {
  billInput = parseFloat(event.target.value); // ✅ 🚩✅ I used at first onChange but with event I need to only use target.Ensure billInput is a number
  callCalculateTipAmount(); // ✅ Call function to check conditions and calculate tip
};

//----------- handleTipButtonClick---------------
const handleTipButtonClick = (event) => {
  let myDataTip = event.target.getAttribute('data-tip');
  tipAmount = parseFloat(myDataTip) / 100;

  // Remove active class from all buttons
  let buttons = document.querySelectorAll('.tip-buttons-grp__tipBtn'); //select all the buttons with the same class name
  buttons.forEach((button) => {
    // iterate through them and do the following:
    button.classList.remove('tip-buttons-grp__active'); // remove the active state on all the buttons
  });
  event.target.classList.add('tip-buttons-grp__active'); // Add active class to the clicked button
  callCalculateTipAmount();
};

//----------- handleNumberOfPeopleInput---------------
const handleNumberOfPeopleInput = (event) => {
  numberOfPeople = parseFloat(event.target.value); //
  callCalculateTipAmount(); // ✅ Call function to check conditions and calculate tip
};

//----------- calculateTipAmount---------------
//----------- calculateTipAmount---------------
const calculateTipAmount = () => {
  const totalTipAmount = billInput * tipAmount;
  const tipAmountPerPerson = totalTipAmount / numberOfPeople; // ✅ Correct formula for per person calculation
  document.getElementById('tip-amount').innerHTML = tipAmountPerPerson.toFixed(2); // ✅ Use toFixed(2) to format the number to two decimal places

  //----------- handleTotalAmount---------------
  // ✅ Update total amount per person
  const totalAmountPerPerson = (billInput + totalTipAmount) / numberOfPeople;
  document.getElementById('total-amount').innerHTML = totalAmountPerPerson.toFixed(2); // ✅ Use toFixed(2) to format the number to two decimal places
};
//----------- handleReset---------------
const handleReset = () => {
  billInput = 0;
  tipAmount = 0;
  tipAmountTotal = 0;
  numberOfPeople = 0;
  total = 0;
  document.getElementById('bill-amount').value = '';
  document.getElementById('num-people').value = '';
  document.getElementById('tip-amount').innerHTML = '0.00';
  document.getElementById('total-amount').innerHTML = '0.00';
  //Remove active class from all buttons
  let buttons = document.querySelectorAll('.tip-buttons-grp__tipBtn');
  buttons.forEach((button) => {
    button.classList.remove('tip-buttons-grp__active');
  });
};

// Adding event listeners
document.getElementById('bill-amount').addEventListener('input', handleBillInput);
document.getElementById('5btn').addEventListener('click', handleTipButtonClick);
document.getElementById('10btn').addEventListener('click', handleTipButtonClick);
document.getElementById('15btn').addEventListener('click', handleTipButtonClick);
document.getElementById('25btn').addEventListener('click', handleTipButtonClick);
document.getElementById('30btn').addEventListener('click', handleTipButtonClick);
document.getElementById('50btn').addEventListener('click', handleTipButtonClick);
document.getElementById('num-people').addEventListener('input', handleNumberOfPeopleInput);
document.getElementById('reset-button').addEventListener('click', handleReset);

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

/////// ---------      TOOLS KIT    ----------///////////////////////

/*


-----------------    Functions:    ----------------------- 



Arrow Function:

Pros: Concise, lexically binds this (useful when you need to maintain the context of this inside a method).
Cons: Cannot be used as constructors, no access to arguments object.
Use Case: Best for event handlers and short functions.

const handleBillInput = (event) => {
  // function body
}

Unnamed/ Anonymous Arrow Function:
An arrow function can be used anonymously, such as when passed directly as an argument to another function:

document.getElementById('button').addEventListener('click', () => {
  // function body
});

Concise Arrow Functions Syntax Variations:

Single Parameter without Parentheses:

If the arrow function has a single parameter, you can omit the parentheses.
javascript
Copy code
const greet = name => `Hello, ${name}`;


No Parameters or Multiple Parameters:

If there are no parameters or more than one parameter, parentheses are required.

const greet = () => `Hello, World`;
const add = (a, b) => a + b;


Single Expression without Curly Braces:

If the function body consists of a single expression or statement, you can omit the curly braces {} and the return keyword. The value of the expression is implicitly returned.

const square = x => x * x;


Multiple Statements with Curly Braces:

If the function body contains multiple statements, you need to use curly braces {} and explicitly use the return keyword if needed.

const add = (a, b) => {
  const sum = a + b;
  return sum;
};


Named Function:

Pros: Can be used for recursion❓, more readable stack traces in debugging, good for named event handlers.
Cons: Slightly more verbose.
Use Case: Good for more complex functions that benefit from a named reference.

function handleBillInput(parameter) {
  // function body
}

Anonymous Function:

Pros: Flexible, can be used where functions need to be passed around as variables.
Cons: Less readable stack traces in debugging.
Use Case: Useful for one-time event handlers or callbacks.

const handleBillInput = function(event) {
  // function body
}

When the 'return' word is added?
The inclusion of the return keyword depends on whether the function needs to return a value. In the context of event handlers or functions that perform an action without returning a value, the return keyword might not be necessary. However, if the function is meant to compute and return a value, then return should be used.
  

//-------Accessing the DOM Elements-------------
let myBillAmount = document.getElementById('bill-amount');

---------------     Event listeners:     -----------------
/*
document.getElementById('daily').addEventListener('click', () => generateCards('daily'));
document.getElementById('bill-amount').addEventListener('input', handleBillInput);
document.getElementById('5%-btn').addEventListener('click', handleTipButtonClick);



---------------     loops     -----------------
Summary:
for Loop: Best for a known number of iterations.
while Loop: Ideal for unknown number of iterations, continuing until a condition is false.
do...while Loop: Ensures the loop runs at least once.
for...of Loop: Convenient for iterating over arrays and other iterable objects.
for...in Loop: Useful for iterating over the properties of an object.

1. for Loop:
* used when you know in advance how many times you want to execute a statement or a block of statements.
* Iterating over arrays.
* Running a loop a specific number of times.

for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}


2. while Loop:
* executes a statement or block of statements as long as a specified condition is true.
* Running a loop until a condition is no longer true.
* Suitable for situations where the number of iterations is not known beforehand.


let count = 0;
while (count < 5) {
  console.log(`Count is ${count}`);
  count++;
}


3. do...while Loop:
* similar to a while loop, except that the condition is evaluated after the execution of the statement block.
* Ensuring the loop runs at least once.


let count = 0;
do {
  console.log(`Count is ${count}`);
  count++;
} while (count < 5);


4. for...of Loop:
* used to iterate over iterable objects (like arrays, strings, maps, sets, etc.).
* Simplified syntax for iterating over arrays and other iterable objects.


const array = ['a', 'b', 'c'];
for (const element of array) {
  console.log(element);
}

5. for...in Loop:
*  used to iterate over the enumerable properties of an object.
* Iterating over the properties of an object.

const object = { a: 1, b: 2, c: 3 };
for (const key in object) {
  if (object.hasOwnProperty(key)) {
    console.log(`${key}: ${object[key]}`);
  }
}


---------------     Array Methods   -----------------

forEach:
Executes a provided function once for each array element.

const array = [1, 2, 3, 4, 5];
array.forEach(element => console.log(element));

map:
Creates a new array populated with the results of calling a provided function on every element in the calling array.

const array = [1, 2, 3, 4, 5];
const doubled = array.map(element => element * 2);
console.log(doubled); // [2, 4, 6, 8, 10]


filter:
Creates a new array with all elements that pass the test implemented by the provided function.

const array = [1, 2, 3, 4, 5];
const evens = array.filter(element => element % 2 === 0);
console.log(evens); // [2, 4]

reduce:
Executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

const array = [1, 2, 3, 4, 5];
const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15

find:
Returns the value of the first element in the array that satisfies the provided testing function.

const array = [1, 2, 3, 4, 5];
const found = array.find(element => element > 3);
console.log(found); // 4

findIndex:
Returns the index of the first element in the array that satisfies the provided testing function.

const array = [1, 2, 3, 4, 5];
const index = array.findIndex(element => element > 3);
console.log(index); // 3

includes:
Determines whether an array includes a certain value among its entries, returning true or false as appropriate.

const array = [1, 2, 3, 4, 5];
console.log(array.includes(3)); // true
console.log(array.includes(6)); // false

some:
Tests whether at least one element in the array passes the test implemented by the provided function.

const array = [1, 2, 3, 4, 5];
const hasEven = array.some(element => element % 2 === 0);
console.log(hasEven); // true

every:
Tests whether all elements in the array pass the test implemented by the provided function.
javascript
Copy code
const array = [1, 2, 3, 4, 5];
const allEven = array.every(element => element % 2 === 0);
console.log(allEven); // false

sort:
Sorts the elements of an array in place and returns the array.

const array = [5, 3, 8, 1, 2];
array.sort((a, b) => a - b);
console.log(array); // [1, 2, 3, 5, 8]


--------------    Object Methods --------------------------

Object.keys:
Returns an array of a given object's own enumerable property names.

const object = { a: 1, b: 2, c: 3 };
const keys = Object.keys(object);
console.log(keys); // ['a', 'b', 'c']

Object.values:
Returns an array of a given object's own enumerable property values.

const object = { a: 1, b: 2, c: 3 };
const values = Object.values(object);
console.log(values); // [1, 2, 3]

Object.entries:
Returns an array of a given object's own enumerable property [key, value] pairs.

const object = { a: 1, b: 2, c: 3 };
const entries = Object.entries(object);
console.log(entries); // [['a', 1], ['b', 2], ['c', 3]]

Object.assign:
Copies all enumerable own properties from one or more source objects to a target object. It returns the target object.

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }

Object.freeze:
Freezes an object. A frozen object can no longer be changed; freezing an object prevents new properties from being added to it, existing properties from being removed, and prevents existing properties, or their enumerability, configurability, or writability, from being changed.

const object = { a: 1, b: 2 };
Object.freeze(object);
object.a = 3; // This will not change the value of 'a'
console.log(object.a); // 1

Object.seal:
Seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.

const object = { a: 1, b: 2 };
Object.seal(object);
object.a = 3; // This will change the value of 'a'
delete object.b; // This will not delete 'b'
console.log(object); // { a: 3, b: 2 }

--------------   Conditionals  --------------------------
Summary:
if Statement: Basic conditional to execute code if a condition is true.
if...else Statement: Provides an alternative block of code to execute if the condition is false.
else if Statement: Adds multiple conditions to handle various scenarios.
switch Statement: Cleaner syntax for handling multiple conditions based on the same expression.
Ternary Operator: Concise conditional operator for simple if...else statements.
Logical Operators: Combine multiple conditions in a single if statement.

if Statement:
Executes a block of code if a specified condition is true.

const age = 18;
if (age >= 18) {
  console.log("You are an adult.");
}


if...else Statement:
Executes one block of code if a condition is true and another block if it is false.

const age = 16;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}

else if Statement:
Specifies a new condition to test if the first condition is false.

const score = 75;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

switch Statement:
Evaluates an expression and executes code based on matching case statements.
javascript
Copy code
const fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Banana is yellow.");
    break;
  case "apple":
    console.log("Apple is red.");
    break;
  case "orange":
    console.log("Orange is orange.");
    break;
  default:
    console.log("Unknown fruit.");
}

Ternary Operator:
A shorthand for if...else statements. Returns one of two values based on a condition.

const age = 20;
const isAdult = age >= 18 ? "Yes" : "No";
console.log(isAdult); // Output: Yes

Logical Operators:

Logical AND (&&):
Returns true if both operands are true.

const isLoggedIn = true;
const hasPermission = true;
if (isLoggedIn && hasPermission) {
  console.log("Access granted.");
}

Logical OR (||):
Returns true if at least one of the operands is true.

const isWeekend = true;
const isHoliday = false;
if (isWeekend || isHoliday) {
  console.log("You can relax today.");
}

Logical NOT (!):
Returns true if the operand is false, and false if the operand is true.

const isRaining = false;
if (!isRaining) {
  console.log("You can go outside.");
}


Examples and Use Cases:
if...else Statement:
Use when you need to execute different blocks of code based on different conditions.

const temperature = 30;
if (temperature > 30) {
  console.log("It's hot.");
} else if (temperature < 10) {
  console.log("It's cold.");
} else {
  console.log("The weather is moderate.");
}

switch Statement:
Use for multiple possible conditions that are based on the same variable or expression.

const day = "Tuesday";
switch (day) {
  case "Monday":
    console.log("Start of the work week.");
    break;
  case "Wednesday":
    console.log("Midweek.");
    break;
  case "Friday":
    console.log("End of the work week.");
    break;
  default:
    console.log("Regular day.");
}


Ternary Operator:
Use for simple if...else conditions in a concise manner.

const age = 22;
const canVote = age >= 18 ? "Yes" : "No";
console.log(`Can vote: ${canVote}`);

Logical Operators:
Use to combine multiple conditions in an if statement.

const user = {
  isLoggedIn: true,
  hasPermission: false
};

if (user.isLoggedIn && user.hasPermission) {
  console.log("Welcome to the admin panel.");
} else {
  console.log("Access denied.");
}

Error Handling:

try {
  // Code that may throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('An error occurred:', error);
} finally {
  console.log('This runs regardless of the result');
}

Promises and Async/Await:

// Using Promises
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulate an async operation
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Using Async/Await
const fetchDataAsync = async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchDataAsync();


-------------    Fetching Data   --------------------

1. Fetching Data using Promises:
fetch API returns a promise that resolves to the response of the request.

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

2. Fetching Data using Async/Await:
Simplifies the handling of promises.

const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();

-------------   Validation Methods ----------------------

1. Text Validation:
Check if the input is a non-empty string.

const isValidText = (text) => {
  // Regular expression to check for letters only (both uppercase and lowercase)
  const letterRegex = /^[A-Za-z]+$/;

  /*
Regular Expression Explanation:
/^: Asserts position at the start of the string.
[A-Za-z]: Matches any single character from 'A' to 'Z' or from 'a' to 'z'.
+: Matches one or more of the preceding element (i.e., [A-Za-z]).
$/: Asserts position at the end of the string.
  */

/*
  return typeof text === 'string' && text.trim().length > 0 && letterRegex.test(text);
};

console.log(isValidText('Hello')); // true
console.log(isValidText('Hello123')); // false
console.log(isValidText('Hello!')); // false
console.log(isValidText('')); // false
console.log(isValidText('   ')); // false


2. Number Validation:
Check if the input is a valid number.

const isValidNumber = (number) => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

console.log(isValidNumber(123)); // true
console.log(isValidNumber('abc')); // false


3. Email Validation:

Basic email validation using regex.

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

console.log(isValidEmail('test@example.com')); // true
console.log(isValidEmail('invalid-email')); // false

*/
