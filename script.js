
//#basic math operators
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

// #4 Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.


//html collection of button elements
const numbers = document.getElementsByClassName('numbers');
const equal = document.getElementById('equal');
const operators = document.getElementsByClassName('operator');
const topButtons = document.getElementsByClassName('top-btn');

equal.addEventListener('click', evaluate);

//convert node list to array
//loop thru array of button elements and attach listener to each element
Array.from(numbers).forEach(button => { 
    button.addEventListener('click', getNumber) 
    button.addEventListener('transitionend', removeTransition)
    button.addEventListener('click', flashButton)
    }
);
Array.from(operators).forEach(x => x.addEventListener('click', getOperator));
Array.from(topButtons).forEach(x => x.addEventListener('click', modifyNumber));

let operatorSelection = '';
let combinedNumber = '';
let firstNumber = '';
let results = '';

//return selected number as input into display function
function getNumber(e) {
    return combine(e.target.textContent);
}

//combine characters into string of numbers
function combine(number) {
    //limit characters on screen to 9
    if (combinedNumber.length <= 8) {
        combinedNumber += number;
    } else {
        combinedNumber;
    }
    return display(combinedNumber);
}
//format and display numbers on calc screen
function display(number) {
    // element for calculator screen 
    let display = document.getElementById('display');
    //format numbers with commas
    let formatNumbs = Intl.NumberFormat('en-US').format(number);
    display.textContent = formatNumbs;
}

//clear numbers on display or show as a negative number or decimal
function modifyNumber(e) {
    // element for calculator screen 
    let display = document.getElementById('display');
 
    if (e.target.textContent == 'AC') { 
        combinedNumber = '';
        firstNumber ='';
        operatorSelection = '';
        Array.from(operators).forEach(element => element.classList.remove('selected'));
        equal.id = 'equal';
        
    } else if(e.target.textContent == '±') {
        combinedNumber = combinedNumber * -1;

    } else if(e.target.textContent == '%') {
        combinedNumber = combinedNumber /100;
    }

    display.textContent = Intl.NumberFormat('en-US').format(combinedNumber);
}

function getOperator(e) {
    let display = document.getElementById('display');
    let clickedButton= e.target;
    Array.from(operators).forEach(element => element.classList.remove('selected'));
    clickedButton.classList.toggle('selected');
    equal.id = 'equal';

    //store operator selection
    operatorSelection = clickedButton.textContent;

    firstNumber = display.textContent.replace('/,/g', '');
    combinedNumber = ''; 
}

function evaluate(e) {
    Array.from(operators).forEach(element => element.classList.remove('selected'));
    equal.id = 'selected' 
    //evaluate expression
    results = operate(operatorSelection, firstNumber * 1, combinedNumber * 1);
    firstNumber =  results;
    display(results);
}

//create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(operator, x, y) {
    if(operator == '+') {
        return add(x,y);
    } else if(operator == '−') {
        return subtract(x,y);
    } else if(operator == '×') {
        return multiply(x,y);
    } else if(operator == '÷') {
        return divide(x,y);
    }
}

function flashButton(e) {
    e.target.classList.add('flash');
}

function removeTransition(e) {
    // if (e.propertyName !== 'transform') return;
    e.target.classList.remove('flash');
    console.log(e);
}

