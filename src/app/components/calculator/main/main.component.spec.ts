import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainCalculatorComponent } from './main.component';
import { CalculatorHistoryService } from '../../../services/calculator-history.service';
import { HeaderComponent } from '../header/header.component';
import { BodyComponent } from '../body/body.component';
import { HistoryComponent } from '../history/history.component';

describe('MainCalculatorComponent', () => {
  let component: MainCalculatorComponent;
  let fixture: ComponentFixture<MainCalculatorComponent>;
  let historyService: CalculatorHistoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainCalculatorComponent,
        HeaderComponent,
        BodyComponent,
        HistoryComponent
      ],
      providers: [CalculatorHistoryService]
    }).compileComponents();

    fixture = TestBed.createComponent(MainCalculatorComponent);
    component = fixture.componentInstance;
    historyService = TestBed.inject(CalculatorHistoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset all values', () => {
    component.result = '123';
    component.currentResult = '123';
    component.previousResult = '321';
    component.operator = '+';
    component.reset();

    expect(component.result).toBe('0');
    expect(component.currentResult).toBe('');
    expect(component.previousResult).toBe('');
    expect(component.operator).toBe('');
  });

  it('should insert a number', () => {
    component.result = '0';
    component.insertNumber('5');
    expect(component.result).toBe('5');
  });

  it('should not add number if currentResult length >= 14', () => {
    component.currentResult = '12345678901234';
    component.result = '12345678901234';
    component.insertNumber('1');
    expect(component.result).toBe('12345678901234');
  });

  it('should add a decimal point if not already present', () => {
    component.result = '123';
    component.addDecimal();
    expect(component.result).toBe('123.');
  });

  it('should not add decimal if already present', () => {
    component.result = '123.4';
    component.addDecimal();
    expect(component.result).toBe('123.4');
  });

  it('should calculate division by zero as Error', () => {
    const spy = spyOn(historyService, 'addEntry');
    component.result = '5';
    component.setOperator('÷');
    component.result = '0';
    component.calcResult();
    expect(component.result).toBe('Error');
    expect(spy).toHaveBeenCalledWith('5 ÷ 0 = Error');
  });
});