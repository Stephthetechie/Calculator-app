let previousCalculation =[];

// To use keyboard keys
 document.addEventListener('keydown', function(event){
    const keyValue = event.key;
    const display= document.getElementById('display')

    if (keyValue >= '0' && keyValue <= '9'|| keyValue === '.' || keyValue === '+' || keyValue === '-' || keyValue === 'x' || keyValue === '/') {
        appendToDisplay(keyValue)
    }else if (keyValue === 'Backspace' || keyValue === 'Delete'){
        clearDisplay()
    }else if(keyValue === 'C' || keyValue === 'c'){
        goBackToPreviousCalculation();
    }else if(keyValue === 'Enter'){
        calculate()
    }
 
 });
    
//  For overflow text on display
 const display = document.getElementById('display');

 function appendToDisplay(input) {
    display.value += input
    if (display.scrollWidth > display.offsetWidth) {
        display.classList.add('overflow')
    } else {
        display.classList.remove('overflow')

    }
 }

 function clearDisplay(){
    display.value = ""
 }

//  Calculation function
function calculate() {
    try {
        const result = eval(display.value)
        previousCalculation.push(display.value)
        display.value = result
    } catch (error) {
        display.value= "Error"
    }
     
}

function goBackToPreviousCalculation(){
    if (previousCalculation.length > 0) {
       display.value = previousCalculation.pop();
    }
}

// Blinking cursor
const cursor = document.createElement ('span');

cursor.style.position = 'absolute';
cursor.style.top = '0';
cursor.style.left = '0';
cursor.style.width = '1px';
cursor.style.height = '20px';
cursor.style.background = 'white';
cursor.style.animation = 'blink 1s infinite';


const displayRect = display.getBoundingClientRect();
const cursorLeft = displayRect.left + display.value.length * 30 + display.paddingLeft + display.borderLeftWidth;
const cursorTop = displayRect.top;

// Set the position of the cursor element
cursor.style.left = cursorLeft + 'px';
cursor.style.top = cursorTop + 'px';

display.parentNode.appendChild(cursor)

document.styleSheets[0].insertRule(`
    
    @keyframes blink{
        0% {
            opacity: 1;
        }
        50%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`)