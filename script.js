// Select display elements
const display = document.getElementById("display");
const secondaryDisplay = document.getElementById("secondary-display");

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Event listeners for button clicks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.number) appendNumber(btn.dataset.number);
    if (btn.dataset.action) handleAction(btn.dataset.action);
  });
});

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
  const keyMap = {
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    ".": "decimal", "/": "divide", "*": "multiply",
    "-": "subtract", "+": "add", "=": "equals", "Enter": "equals",
    "Backspace": "clear", "%": "percent"
  };

  const action = keyMap[e.key];
  if (action) {
    const button = document.querySelector(
      `[data-number="${action}"], [data-action="${action}"]`
    );
    if (button) button.click();
  }
});

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function handleAction(action) {
  switch (action) {
    case "clear":
      resetCalculator();
      break;
    case "decimal":
      addDecimal();
      break;
    case "plus-minus":
      toggleSign();
      break;
    case "percent":
      convertToPercent();
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      setOperator(action);
      break;
    case "equals":
      evaluate();
      break;
  }
}

function resetCalculator() {
  display.textContent = "0";
  secondaryDisplay.textContent = "";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

function addDecimal() {
  if (!display.textContent.includes(".")) display.textContent += ".";
}

function toggleSign() {
  display.textContent = String(-parseFloat(display.textContent));
}

function convertToPercent() {
  display.textContent = String(parseFloat(display.textContent) / 100);
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = parseFloat(display.textContent);
  currentOperator = operator;

  const operatorSymbol = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷"
  };

  secondaryDisplay.textContent = `${firstOperand} ${operatorSymbol[operator]}`;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = parseFloat(display.textContent);

  let result;
  switch (currentOperator) {
    case "add":
      result = firstOperand + secondOperand;
      break;
    case "subtract":
      result = firstOperand - secondOperand;
      break;
    case "multiply":
      result = firstOperand * secondOperand;
      break;
    case "divide":
      result = firstOperand / secondOperand;
      break;
  }

  display.textContent = String(result);
  secondaryDisplay.textContent = `${firstOperand} ${{
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷"
  }[currentOperator]} ${secondOperand} =`;
  currentOperator = null;
}
