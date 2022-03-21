// get UI elements
const display1El    = document.querySelector('.display-1'),
    display2El      = document.querySelector('.display-2'),
    displayTempEl   = document.querySelector('.display-temp'),
    numberEl        = document.querySelectorAll('.number'),
    operatorEl      = document.querySelectorAll('.operator'),
    clearEl         = document.querySelector('.clear-all'),
    clearOneEl      = document.querySelector('.clear-one'),
    equalEl         = document.querySelector('.equal');

// get all vers
let disNum1         = '',
    disNum2         = '',
    result          = null;
    lastOperation   = '',
    hasDot          = false;

//get numbers
/* || OLD method with function ||
numberEl.forEach(function(number){
    number.addEventListener('click', function(thisEvent){
        if (thisEvent.target.innerText == '.' && !hasDot) {
            hasDot = true;
        } else if (thisEvent.target.innerText == '.' && hasDot) {
            return;
        }
        let getNum = thisEvent.target.innerText;
        disNum2 += getNum;
        display2El.innerText = disNum2;
    });
});
*/ 
numberEl.forEach(number=>{
    number.addEventListener('click', (thisEvent)=>{
        if (thisEvent.target.innerText == '.' && !hasDot) {
            hasDot = true;
        } else if (thisEvent.target.innerText == '.' && hasDot) {
            return;
        } 
        disNum2 += thisEvent.target.innerText;
        display2El.innerText = disNum2;
    });
});
operatorEl.forEach(operator=>{
    operator.addEventListener('click', (thisEvent)=>{
        /* new technique
        if (!disNum2) {
            return;
        }
        */
        if (!disNum2) return;
        hasDot = false;
        const operatorName = thisEvent.target.innerText;
        /* if (operatorName === '√') {
            !result ? doSqrRoot(disNum2) : doSqrRoot(result);
        } else*/ if (disNum1 && disNum2 && lastOperation) {
            doCalculation();
        } else {
            result = parseFloat(disNum2);
        }
        removeDisplay(operatorName);
        lastOperation = operatorName;
    });
});

// clear display
function removeDisplay(name = '') {
    disNum1 += disNum2 + ' ' + name + ' ';
    display1El.innerText = disNum1;
    display2El.innerText = '';
    disNum2 = '';
    displayTempEl.innerText = result;
}

// All the calculation
function doCalculation(){
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(disNum2);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(disNum2);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(disNum2);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(disNum2);
    } 
}

// equals
equalEl.addEventListener('click', (thisEvent)=>{
    getResult()
});

// clear all
clearEl.addEventListener('click', (thisEvent)=>{
    clearAllOperation();
});

// clear last entry

clearOneEl.addEventListener('click', (thisEvent)=>{
    clearLastOperation();
});

function clearAllOperation(){
    display2El.innerText = '0';
    display1El.innerText = '0';
    disNum1 = '';
    disNum2 = '';
    displayTempEl.innerText = '0';
}

function clearLastOperation(){
    if (!disNum2) return;
    display2El.innerText = '0';
    disNum2 = '';
}

function getResult(){
    if (!disNum1 || !disNum2) return;
    doCalculation();
    hasDot = false;
    removeDisplay();
    display2El.innerText = result;
    displayTempEl.innerText = '';
}

// keyboard functionality
window.addEventListener('keydown', (thisEvent)=>{
    if (
    thisEvent.key === '1' ||
    thisEvent.key === '2' ||
    thisEvent.key === '3' ||
    thisEvent.key === '4' ||
    thisEvent.key === '5' ||
    thisEvent.key === '6' ||
    thisEvent.key === '7' ||
    thisEvent.key === '8' ||
    thisEvent.key === '9'
    ) {
        inputNumbKey(thisEvent.key);
    } else if (
    thisEvent.key === '+' ||
    thisEvent.key === '-' ||
    thisEvent.key === '/' ||
    thisEvent.key === '%'
    ) {
        inputOperatorKey(thisEvent.key);
    } else if (thisEvent.key === '*') {
        const newSym = 'X';
        inputMultply(newSym);
    } else if (thisEvent.key === 'Backspace') {
        clearLastOperation();
    } else if (thisEvent.key === '=') {
        getResult();
    }
});

function inputNumbKey(key){
    numberEl.forEach(nums=>{
        if (nums.innerText === key) {
           nums.click();
        }
    });
}

function inputOperatorKey(key){
    operatorEl.forEach(ops=>{
        if (ops.innerText === key) {
           ops.click();
        }
    });
}

function inputMultply(key){
    operatorEl.forEach(ops=>{
        if (ops.innerText === key) {
           ops.click();
        }
    });
}