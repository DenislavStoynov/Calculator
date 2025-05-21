import { Component } from "@angular/core";

@Component({
    selector: 'calculator-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})

export class HeaderComponent {
    classes = ['close', 'minimize', 'maximize']
}