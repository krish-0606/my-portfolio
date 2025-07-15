class Calculator {
    constructor() {
        this.currentDisplay = '0';
        this.displayElement = document.getElementById('display');
        this.initialize();
    }
    initialize() {
        document.querySelector('.buttons').addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('[data-number]')) {
                this.appendToDisplay(target.dataset.number);
            } else if (target.matches('[data-action]')) {
                this.handleAction(target.dataset.action);
            }
        });
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (/[0-9]/.test(key)) {
                this.appendToDisplay(key);
            } else if (['+', '-', '*', '/', '.'].includes(key)) {
                this.appendToDisplay(key);
            } else if (key === 'Enter') {
                this.calculate();
            } else if (key === 'Escape') {
                this.clearDisplay();
            } else if (key === 'Backspace') {
                this.backspace();
            }
        });
    }
    updateDisplay() {
        this.displayElement.textContent = this.currentDisplay;
    }
    appendToDisplay(value) {
        if (this.currentDisplay === '0' && value !== '.') {
            this.currentDisplay = value;
        } else if (value === '.') {
            const parts = this.currentDisplay.split(/[\+\-\*\/]/);
            if (!parts[parts.length-1].includes('.')) {
                this.currentDisplay += value;
            }
        } else {
            this.currentDisplay += value;
        }
        this.updateDisplay();
    }
    handleAction(action) {
        switch(action) {
            case 'clear':
                this.clearDisplay();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'calculate':
                this.calculate();
                break;
            default:
                this.appendToDisplay(action);
        }
    }
    clearDisplay() {
        this.currentDisplay = '0';
        this.updateDisplay();
    }
    backspace() {
        if (this.currentDisplay.length === 1) {
            this.currentDisplay = '0';
        } else {
            this.currentDisplay = this.currentDisplay.slice(0, -1);
        }
        this.updateDisplay();
    }
    calculate() {
        try {
            const result = eval(this.currentDisplay);
            this.currentDisplay = Number.isFinite(result) ? result.toString() : 'Error';
        } catch (error) {
            this.currentDisplay = 'Error';
        }
        this.updateDisplay();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});