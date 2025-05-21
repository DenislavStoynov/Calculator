import { Component } from '@angular/core';
import { rows } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result = '0';
  currentResult = '';
  operator = '';
  previousResult = '';
  rows = rows;

  reset() {
    this.result = '0';
    this.previousResult = ''; // variable for keeping track of the result and using it for calculation
    this.currentResult = ''; // flag for tracking the number after operator selection
    this.operator = '';
  }

  addDecimal() {
    if (!this.result.includes('.')) {
      this.result += '.';
    }
  }

  negate() {
    if (this.result !== '0') this.result = (Number(this.result) * -1).toString();
  }

  percent() {
    this.result = (Number(this.result) / 100).toString();
  }

  insertNumber(op: string) {
    if (this.result === '0') {
      this.result = op;
    } else if (this.operator && !this.currentResult) {
      this.result = op;
    } else {
      this.result += op;
    }

    this.currentResult = this.result;
  }

  setOperator(op: string) {
    if (this.currentResult) {
      this.calcResult();
    }
    this.operator = op;
    this.previousResult = this.result;
    this.currentResult = '';
  }

  calcResult() {
    const firstNum = parseFloat(this.previousResult);
    const secondNum = parseFloat(this.result);

    switch (this.operator) {
      case '+':
        this.result = (firstNum + secondNum).toString();
        break;
      case '-':
        this.result = (firstNum - secondNum).toString();
        break;
      case 'x':
        this.result = (firstNum * secondNum).toString();
        break;
      case '÷':
        this.result = secondNum === 0 ? 'Error' : (firstNum / secondNum).toString();
        break;
      default:
        return;
    }

    this.previousResult = '';
    this.currentResult = '';
    this.operator = '';
  }

  calculate(op: string) {
    if (op === 'AC') return this.reset();
    if (op === '+/-') return this.negate();
    if (op === '%') return this.percent();
    if (op === ',') return this.addDecimal();
    if (['+', '-', 'x', '÷'].includes(op)) return this.setOperator(op);
    if (op === '=') return this.calcResult();
    return this.insertNumber(op);
  }
}
