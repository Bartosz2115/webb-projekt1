const screenText = document.getElementById("screen-text");
const errorText = document.getElementById("screen-text-error")

var keypadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.']

var calc = '';

var maxLenght = false;
var error = false;
var errorType = '';
var errorTime = 0;

var charLimit = 12; // default character limit, can be changed with setCharLimit(value) in console

function screenClear() {
    calc = ''
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addUnit(x) {
    if (maxLenght === false) {
        calc = calc + x;
    } else if (maxLenght === true) {
        errorType = "maxCharLength"
        error = true;
    }
}

function sum() {
    if (["+", "-", "*", "/"].indexOf(calc.slice(-1)) !== -1) {
        errorType = "inputError";
        error = true;
    } else {
        calc = eval(calc).toString();
    }
}

function setCharLimit(value = 12) { // 12 is default 
    charLimit = value;
}

async function update() { // updates calculators screen every millisecond!
    while (true) {
        if (calc.length >= charLimit) {
            maxLenght = true;
            calc = calc.substring(0, charLimit)
        } else {
            maxLenght = false;
        }

        if (error === true) {
            errorTime += 1;

            if (errorType === 'maxCharLength') {
                errorText.innerHTML = 'ERROR: MAX CHAR LENGTH';
            } else if (errorType === 'inputError') {
                errorText.innerHTML = 'ERROR: INPUT ERROR';
            } else {
                errorText.innerHTML = 'ERROR: UNKNOWN';
            }
            
            if (errorTime >= 1000 || maxLenght === false && errorType === "maxCharLength") {
                error = false;
                errorTime = 0;
                errorType = ''; // error reset
                errorText.innerHTML = '';
            }
        }

        if (screenText.innerHTML != calc) { // Update number only when changed
            screenText.innerHTML = calc;
        }
        await sleep(1); // sleep function to not crash the website
    }
}



document.addEventListener('keydown', (event) => { // you can write numbers with buttons and your keyboard
    var Key = event.key
    if (keypadKeys.includes(Key)) {
        addUnit(event.key)
    } else if (Key === 'Backspace') {
        screenClear();
    } else if (Key === 'Enter' || Key === '=') {
        sum()
    }
}, false);

function currencyCalc(mode) {
    var usdToEur = '1.03';
    var eurToUsd = '0.97';

    var usdToSek = '11.35';
    var sekToUsd = '0.088';

    var eurToSek = '11.07';
    var sekToEur = '0.090';

    if (maxLenght === true) {
        errorType = "maxCharLength"
        error = true;
    } else if (mode === 'usdToEur') {
        calc += '*' + usdToEur;
    } else if (mode === 'eurToUsd') {
        calc += '*' + eurToUsd;
    } else if (mode === 'usdToSek') {
        calc += '*' + usdToSek;
    } else if (mode === 'sekToUsd') {
        calc += '*' + sekToUsd;
    } else if (mode === 'eurToSek') {
        calc += '*' + eurToSek;
    } else if (mode === 'sekToEur') {
        calc += '*' + sekToEur;
    }
}