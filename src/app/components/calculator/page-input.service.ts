import { Injectable } from '@angular/core';
import { fromEvent, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CALC_BUTTONS } from './calc-buttons';
import { CalculatorService } from './calculator.service';

@Injectable({
  providedIn: 'root'
})
export class PageInputService {
  private readonly BUTTONS = CALC_BUTTONS.reduce(
    (acc, row) => [...acc, ...row],
    []
  );
  private readonly NUMBERS = this.BUTTONS.map(({ value }) => value).filter(
    (num) => Number(num) || num === 0
  );
  /**
   * Record where the key is the keyboard key, and value
   * the HTML element
   */
  private BUTTON_ELEMENTS = this.BUTTONS.reduce(
    (acc, { word, value }) => ({
      ...acc,
      [value]: document.getElementById(word)
    }),
    {}
  ) as Record<string, HTMLElement>;
  private _keypress = fromEvent(document, 'keypress') as Observable<
    KeyboardEvent
  >;

  constructor(private calculator: CalculatorService) {
    this._keypress
      .pipe(map(({ key }) => key))
      .subscribe(this.dispatchCalculatorAction.bind(this));
  }
  /**
   * TODO: click animation is not shown, thus not supporting
   */
  private clickNumberElement(key: string) {
    const element = this.BUTTON_ELEMENTS[key];
    if (!element) {
      return;
    }
    element.click();
  }
  private dispatchCalculatorAction(key: string): void {
    if (this.NUMBERS.includes(Number(key))) {
      return this.calculator.enterNumber(+key);
    }
    switch (key) {
      case '.':
        return this.calculator.enterDecimal();
      case 'C':
      case 'c':
        return this.calculator.clear();
      case '+':
        return this.calculator.add();
      case '-':
        return this.calculator.subtract();
      case '/':
        return this.calculator.divide();
      case 'x':
      case 'X':
      case '*':
        return this.calculator.times();
      case '=':
        return this.calculator.equals();
    }
  }
}
