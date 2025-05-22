import { Routes } from '@angular/router';
import { HistoryManagerComponent } from './components/manager/manager.component';
import { MainCalculatorComponent } from './components/calculator/main/main.component';

export const routes: Routes = [
    {path: 'calculator', component: MainCalculatorComponent},
    { path: 'history-manager', component: HistoryManagerComponent }
];
