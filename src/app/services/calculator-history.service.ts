import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CalculatorHistoryService {
    private readonly LOCALSTORAGE_KEY = "calculator-history";
    history = signal<{ id: number, entry: string }[]>(this.loadHistory());

    private loadHistory() {
        const entries = localStorage.getItem(this.LOCALSTORAGE_KEY);
        return entries ? JSON.parse(entries) : [];
    }

    private saveHistoryToLocalStorage() {
        localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(this.history()));
    }

    addEntry(entry: string) {
        this.history.update(prev => [...prev, { id: Date.now(), entry }]);
        this.saveHistoryToLocalStorage();
    }

    removeEntry(idx: number) {
        const newHistory = this.history().filter((e) => e.id !== idx);
        this.history.set(newHistory);
        this.saveHistoryToLocalStorage();
    }

    clearAllEntries() {
        this.history.set([]);
        localStorage.removeItem(this.LOCALSTORAGE_KEY);
    }
}