
//#1 basic math operators

function add(x,y) {
    return x + y;
}

function subtract(x,y) {
    return x - y;
}

function multiply(x,y) {
    return x * y;
}

function divide(x,y) {
    if(y == 0) {
     return 'DIV/0';
    } else {
    return x / y;
    }
}

// #2 create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(operator, x, y) {
    if(operator == 'divide') {
        return divide(x,y);
    }
}

// #4 Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

// display element
let display = document.getElementById('display');

//node list of button elements
let numbers = document.getElementsByClassName('numbers');
//convert node list to array and store in variable
let arrayOfNumbs = Array.from(numbers);

//loop thru array of button elements and attach listener to each element
arrayOfNumbs.map(x => x.addEventListener('click', getNumber));


let topButtons = document.getElementsByClassName('top-btn');
let arrayOfTopBtns = Array.from(topButtons);
arrayOfTopBtns.map(x => x.addEventListener('click', modifyNumber));


//add numbers to calculator screen
function getNumber(e) {

   if(display.textContent == 0) {
    display.textContent = '';
   } 

    //remove comma format from numbers
    let numbsOnCalc = display.textContent.replace(/,/g, '');
    // store selected (the number on button that was clicked) number in variable
    let selectedNumb = e.target.textContent;
    //add selected number to other numbers on calc screen
    numbsOnCalc += selectedNumb;
    //format numbers with commas
    let formatNumbs = Intl.NumberFormat('en-US').format(numbsOnCalc);
    display.textContent = formatNumbs;
     
}

//set number in display to 0 or show as a negative number or decimal
function modifyNumber(e) {
    if (e.target.textContent == 'AC') { 
        display.textContent = 0;
    } else if(e.target.textContent == '±') {
        display.textContent = display.textContent * -1;
    } else if(e.target.textContent == '%') {
        display.textContent = display.textContent /100;
    }
}

// console.log(arrayOfNumbs);

