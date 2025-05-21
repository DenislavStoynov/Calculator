import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'calculator-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})

export class HeaderComponent {
    @Output() toggle = new EventEmitter<void>();
    classes = ['close', 'minimize', 'maximize'];

    toggleBodyVisibility() {
        this.toggle.emit();
    }
}