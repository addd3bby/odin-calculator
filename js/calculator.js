let firstOperand = null;
let operation = null;
let secondOperand = null;
let resultShown = false;

const digitsLimit = 10;

let display = document.querySelector("#display");
let operands = document.querySelectorAll(".container > .operand");
operands.forEach(function(operand) {
  operand.addEventListener("click", function(e) {
    if (display.textContent.length < digitsLimit) {
      if (display.textContent === "0" || resultShown) {
        display.textContent = e.target.textContent;
        resultShown = false;
      } else {
        display.textContent += e.target.textContent;
      }
    }
  });
});

let point = document.querySelector(".container > .point");
point.addEventListener("click", function() {
  if (display.textContent.length < digitsLimit && !display.textContent.includes('.')) {
    display.textContent += '.';
  }
});

let clearButton = document.querySelector(".container > .clear");
clearButton.addEventListener("click", function(){
  display.textContent = "0";
  clearStorage();
});

let changeSignButton = document.querySelector(".container > .sign");
changeSignButton.addEventListener("click", function() {
  display.textContent = (parseFloat(display.textContent) * (-1)).toString();
});

let percentButton = document.querySelector(".container > .percent");
percentButton.addEventListener("click", function(){
  display.textContent = (parseFloat(display.textContent) * 0.01).toString();
});

let operatorsButtons = document.querySelectorAll(".container > .operator");
operatorsButtons.forEach(function(operator) {
  operator.addEventListener("click", function(e) {
    resultShown = true;
    if (operation === null) {
      firstOperand = display.textContent;
    } else {
      secondOperand = display.textContent;
      result = operate(operation, firstOperand, secondOperand);
      displayResult(result);
      firstOperand = result;
    }
    operation = e.target.textContent;
  });
});

let equalsButton = document.querySelector(".container > .equals");
equalsButton.addEventListener("click", function() {
  secondOperand = display.textContent;
  result = operate(operation, firstOperand, secondOperand);
  displayResult(result);
  clearStorage();
  firstOperand = result;
});

function displayResult(string) {
  display.textContent = string;
  resultShown = true;
}

function operate(operation, firstOperand, secondOperand) {
  if (secondOperand === null) {
    secondOperand = firstOperand;
  }

  let result = null;
  switch (operation) {
    case '+':
      result = add(firstOperand, secondOperand);
      break;
    case '-':
      result = substruct(firstOperand, secondOperand);
      break;
    case '*':
      result = multiply(firstOperand, secondOperand);
      break;
    case '/':
      result = divide(firstOperand, secondOperand);
      break;
  }

  return result;
}

function clearStorage() {
  firstOperand = null;
  operation = null;
  secondOperand = null;
  resultShown = false;
}

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function substruct(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}
