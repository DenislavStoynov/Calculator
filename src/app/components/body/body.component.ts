import { Component, Input, Output, EventEmitter } from '@angular/core';
import { rows } from '../../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calculator-body',
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  @Input() result = '0';
  @Output() onCalculate = new EventEmitter<string>();
  rows = rows;

  handleCalculate(op: string) {
    this.onCalculate.emit(op)
  }
}
