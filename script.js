let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay();

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    inputNumber(e.target.textContent);
    updateDisplay();
  });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
    updateDisplay();
  });
});

document.getElementById('equals').addEventListener('click', () => {
  if (currentOperator && firstOperand !== null) {
    secondOperand = parseFloat(displayValue);
    displayValue = operate(currentOperator, firstOperand, secondOperand);
    currentOperator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  }
});

document.getElementById('clear').addEventListener('click', () => {
  resetCalculator();
  updateDisplay();
});

document.getElementById('decimal').addEventListener('click', () => {
  inputDecimal();
  updateDisplay();
});

function inputNumber(num) {
  if (waitingForSecondOperand) {
    displayValue = num;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? num : displayValue + num;
  }
}

function inputDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
}

function handleOperator(operator) {
  if (!waitingForSecondOperand) {
    firstOperand = parseFloat(displayValue);
    currentOperator = operator;
    waitingForSecondOperand = true;
  } else {
    currentOperator = operator;
  }
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      return num2 !== 0 ? num1 / num2 : 'Error';
    default:
      return num2;
  }
}

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  waitingForSecondOperand = false;
}
