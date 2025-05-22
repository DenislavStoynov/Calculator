import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavigationComponent, NgIf]
})
export class AppComponent {
  private router = inject(Router);

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }
}
