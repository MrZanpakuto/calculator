
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
    return x / y;
}

// #2 create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

function operate(operator, x, y) {
    if(operator == 'divide') {
        return divide(x,y);
    }
}