import { Component } from '@angular/core';
import { rows } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  result = '0';
  rows = rows;

  calculate(operator: string) {
    console.log(operator);
  }
}
