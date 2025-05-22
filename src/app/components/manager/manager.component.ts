import { Component } from '@angular/core';
import { CalculatorHistoryService } from '../../services/calculator-history.service';

@Component({
  selector: 'history-manager',
  imports: [],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class HistoryManagerComponent {
  constructor(public historyService: CalculatorHistoryService) { }

}
