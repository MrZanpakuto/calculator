//global variables for calculator 
let operatorSelection = '';
let currNumber = '';
let prevNumber = '';

//html collection of button elements
const numbers = document.getElementsByClassName('numbers');
const operators = document.getElementsByClassName('operator');

//button elements
const clearButton = document.querySelector('.clear');
const percentButton = document.querySelector('.percent');
const plusMinusButton = document.querySelector('.plus-minus');
const equalButton = document.querySelector('.equal');

//convert html collection to array
//loop thru array of button elements and attach event listener
Array.from(numbers).forEach(button => { 
    button.addEventListener('click', () => {
        combine(button.innerText);
        addFlash;
    }) 
    button.addEventListener('transitionend', removeFlash) 
    }
);

Array.from(operators).forEach(x => x.addEventListener('click', getOperator));

clearButton.addEventListener('click', clear);
percentButton.addEventListener('click', modifyNumber);
plusMinusButton.addEventListener('click', modifyNumber);
equalButton.addEventListener('click', () => {
        evaluate();
        addFlash;
        removeFlash;
    }
);

//combine characters into string of numbers
function combine(number) {

     // return if decimal is already in current number
     if (number === '.' && currNumber.includes('.')) return;

    //limit characters to 9 to fit on screen
     if (currNumber.length <= 8) {
        currNumber +=  number.toString();
    } else {
        currNumber;
    }
    return formatNumber(currNumber);
}

function formatNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }

    if (decimalDigits != null) {
        return updateDisplay(`${integerDisplay}.${decimalDigits}`);
    } else {
        return updateDisplay(integerDisplay);
    }
}

//display numbers on calculator screen
function updateDisplay(number) {
    const output = document.getElementById('display');
    output.innerText = number;
}

//clear display and global variables
function clear() {
        currNumber = '';
        prevNumber = '';
        operatorSelection = '';
        updateDisplay(null);
        
        // remove color selection from operator buttons
        Array.from(operators).forEach(element => element.classList.remove('selected'));
}

//change output to negative number or decimal
function modifyNumber(e) {
    const output = document.getElementById('display');

    if(e.target.textContent == '±' && output.innerText != 0) {
        currNumber = currNumber * -1;

    } else if(e.target.textContent == '%') {
        currNumber = currNumber /100;
    }
    output.innerText = Intl.NumberFormat('en-US').format(currNumber);
}

function getOperator(e) {
    Array.from(operators).forEach(x => x.classList.remove('selected'));
    e.target.classList.toggle('selected');

    //store operator selection
    operatorSelection = e.target.textContent;

    prevNumber = currNumber;
    currNumber = ''; 
}

function evaluate() {
    Array.from(operators).forEach(x => x.classList.remove('selected'));
    // convert string to float
    const prev = parseFloat(prevNumber);
    const curr = parseFloat(currNumber);

    if (isNaN(prev) || isNaN(curr)) return;

    //evaluate expression
    let result = operate(operatorSelection, prev, curr);
    console.log(typeof result)
    //covert large numbers to scientific notation
    if (result.toString().length > 9) {
        result = Number.parseFloat(result).toExponential(1);
    }

    currNumber = result;

    //set prev number to null so operate function won't be called back to back on same expression (by clicking equal button consecutively)
    prevNumber = '';
    return formatNumber(result);   
}

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

// perform math operation
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

// style buttons on click
function addFlash(e) {
    e.target.classList.add('flash');
}

function removeFlash(e) {
    e.target.classList.remove('flash');
    console.log(e);
}