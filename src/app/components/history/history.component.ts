import { Component } from '@angular/core';
import { CalculatorHistoryService } from '../../services/calculator-history.service';

@Component({
  selector: 'calculator-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  constructor(public historyService: CalculatorHistoryService) { }
}
