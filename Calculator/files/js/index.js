//screen fields
let lastOperationHistory = document.getElementById('history-screen');
let operationResult = document.getElementById('screen');

//array of numbers
let numberButtons = document.querySelectorAll('.number-button');

//array of delete-operations
let deleteButtons = document.querySelectorAll('.delete-button');
let arrayOfResult = [];
let trash;

let arrayOfOperations = document.querySelectorAll('.operation-button');

let currentOperation;

//add event listener to number buttons
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', addNumberToScreen);
}

//add event listener to operation buttons
for (i = 0; i < arrayOfOperations.length; i++) {
    arrayOfOperations[i].addEventListener('click', makeOperation);
}

let equalsButton = document.getElementById('equals-button');
equalsButton.addEventListener('click', doEquals);

//add event listener to delete-buttons
deleteButtons[0].addEventListener('click', deleteAll);
deleteButtons[1].addEventListener('click', deleteOneNumber);

function deleteOneNumber() {
    arrayOfResult = Array.from(operationResult.innerHTML);
    trash = arrayOfResult.pop();
    operationResult.innerText = arrayOfResult.join("");
}

function deleteAll() {
    operationResult.innerHTML = "";
    lastOperationHistory.innerHTML = "";
}

//add number to screen
function addNumberToScreen(event) {
    if (operationResult.innerHTML.length < 14) {
        if (operationResult.innerText === "0") {
            operationResult.innerText = "";
            operationResult.innerText += event.currentTarget.innerHTML;
        } else {
            operationResult.innerText += event.currentTarget.innerHTML;
        }
    } else {
        //nothing
    }
}

let twoFigures;

function makeOperation(event) {
    if((operationResult.innerHTML.indexOf("÷") == -1) && (operationResult.innerHTML.indexOf("×") == -1) && (operationResult.innerHTML.indexOf("-") == -1) && (operationResult.innerHTML.indexOf("×") == -1) && (operationResult.innerHTML.indexOf("×") == -1)){
        if (operationResult.innerHTML != "") {
            if (event.currentTarget.innerHTML === "÷" && operationResult.innerHTML.indexOf("÷") === -1) {
                operationResult.innerText += "÷";
                currentOperation = "÷";
            } else if (event.currentTarget.innerHTML === "×" && operationResult.innerHTML.indexOf("×") === -1) {
                operationResult.innerText += "×";
                currentOperation = "×";
            } else if (event.currentTarget.innerHTML === "-" && operationResult.innerHTML.indexOf("-") === -1) {
                operationResult.innerText += "-";
                currentOperation = "-";
            } else if (event.currentTarget.innerHTML === "+" && operationResult.innerHTML.indexOf("+") === -1) {
                operationResult.innerHTML += "+";
                currentOperation = "+";
            } else {
                //nothing
            }
        }
    }
}

function doEquals() {
    if (operationResult.innerHTML != "") {
        twoFigures = (operationResult.innerHTML).split(currentOperation);
        if (twoFigures.length == 2) {
            lastOperationHistory.innerHTML = operationResult.innerHTML;
            if (currentOperation === "÷") {
                twoFigures = (operationResult.innerHTML).split(currentOperation);
                if (Number.isInteger(Number(twoFigures[0]) / Number(twoFigures[1]))) {
                    operationResult.innerHTML = (Number(twoFigures[0]) / Number(twoFigures[1]));
                } else {
                    operationResult.innerHTML = (Number(twoFigures[0]) / Number(twoFigures[1])).toFixed(2);
                }
            } else if (currentOperation === "×") {
                twoFigures = (operationResult.innerHTML).split(currentOperation);
                operationResult.innerHTML = Number(twoFigures[0]) * Number(twoFigures[1]);
            } else if (currentOperation === "-") {
                twoFigures = (operationResult.innerHTML).split(currentOperation);
                operationResult.innerHTML = Number(twoFigures[0]) - Number(twoFigures[1]);
            } else if (currentOperation === "+") {
                twoFigures = (operationResult.innerHTML).split(currentOperation);
                operationResult.innerHTML = Number(twoFigures[0]) + Number(twoFigures[1]);
            } else {

            }
        } else {
            //nothing
        }
    }
}