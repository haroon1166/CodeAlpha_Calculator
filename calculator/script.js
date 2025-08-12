
const display = document.getElementById('display');
let currentInput = '';

function updateDisplay() {
  display.value = currentInput || '';
}




function calculate() {
  try {
    const result = Function(`"use strict"; return (${currentInput})`)();
    currentInput = Number.isFinite(result) ? result.toString() : 'Error';
  } catch {
    currentInput = 'Error';
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;

    if (key === 'C') {
      currentInput = '';
    } 
    else if (key === '=') {
      calculate();
    } 
    else {
      if (currentInput === 'Error') currentInput = '';
      currentInput += key;
    }
    updateDisplay();
  });
});

// Keyboard Support
document.addEventListener('keydown', e => {
  if (/^[0-9+\-*/.]$/.test(e.key)) {
    currentInput += e.key;
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key.toLowerCase() === 'c') {
    currentInput = '';
  }
  updateDisplay();
});
