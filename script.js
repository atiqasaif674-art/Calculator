const display = document.getElementById("display");
let firstNumber = "";
let operator = "";
let secondNumber = "";
// Clear calculator
function clearDisplay() {
    display.value = "0";
    resetCalculator();
}
// Delete last number
function deleteNumber() {
    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}
// Operator select karna
function chooseOperator(selectedOperator) {
    firstNumber = display.value;
    operator = selectedOperator;
    display.value = "";
}
// Number display karna
function appendNumber(number) {
    if (display.value === "0" && number !== ".") {
        display.value = number;
    } 
    else {
        // Ek hi decimal allow karna
        if (number === "." && display.value.includes(".")) {
            return;
        }
        display.value += number;
    } 
}
// Calculation
//if → check karo 0 hai?
// display.value → Error dikhao
// resetCalculator() → calculator reset karo
// return → function rok do
function calculate() {
    if (firstNumber === "" || operator === "" || display.value === "") {
        return;
    }
    secondNumber = display.value;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                display.value = "Error";
                resetCalculator();
                return;
            }
            result = num1 / num2;
            break;
        case "%":
            result = num1 % num2;
            break;
        default:return;
    }
    display.value = result;
    resetCalculator();
}
// Reset variables
function resetCalculator() {
    firstNumber = "";
    operator = "";
    secondNumber = "";
}
// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;
    // Numbers
    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }
    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {
        chooseOperator(key);
    }
    // Enter = calculate
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    // Escape = clear
    else if (key === "Escape") {
        clearDisplay();
    }
    // Backspace = delete
    else if (key === "Backspace") {

        deleteNumber();
    }
});