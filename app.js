const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button')
const clerBtn = document.getElementById('clear-btn');
//console.log(inputBtns);

let firstValue = 0;
let operatorValue = '';
let awatingNextValue = false;


function  sendNumberValue(number){
    // Replace the currentvalue if first value is entered
    if(awatingNextValue){
        calculatorDisplay.textContent = number;
        awatingNextValue = false;
    }else{
        // if current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : 
        displayValue + number;
    }
    }


   

function addDecimal() {
    // If operator pressed dont add Decimal
    if(awatingNextValue) return;
    if( !calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${ calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstnumber, secondnumber) => firstnumber / secondnumber,

    '*': (firstnumber, secondnumber) => firstnumber * secondnumber,

    '-': (firstnumber, secondnumber) => firstnumber - secondnumber,

    '+': (firstnumber, secondnumber) => firstnumber + secondnumber,

    '=': (firstnumber, secondnumber) =>  secondnumber,
}

function usedOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)
    // Prevent multiple operator
    if(operatorValue && awatingNextValue){
        operatorValue = operator;
        return;
    } 
    //Asign first value if no value
    if( !firstValue){
        firstValue = currentValue;
    }else{
        // console.log(firstValue, operatorValue, currentValue)
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        //console.log('calculation', calculation);
        firstValue = calculation
    }
    
    // Ready for Next value, Store Operator
     awatingNextValue = true;
    operatorValue = operator;
    // console.log('firstValue = ', firstValue);
    // console.log('operatorValue =',operatorValue);
}

inputBtns .forEach((inputBtn) => {
if(inputBtn.classList.length === 0){
    inputBtn.addEventListener('click', () => sendNumberValue( inputBtn.value))
} else if (inputBtn.classList.contains('operator')){
    inputBtn.addEventListener('click', () => usedOperator( inputBtn.value))
} else if (inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', () => addDecimal())
}
})

//Reset Display
function resetAll(){
    firstValue = 0;
   operatorValue = '';
    awatingNextValue = false;
    calculatorDisplay.textContent = '0'
}

clerBtn.addEventListener('click', resetAll)




