import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private _displayValue$ = new BehaviorSubject<string>('');
  public displayValue$ = this._displayValue$.pipe(
    map(this.removeLeadingZeroes),
    tap(console.log)
  );
  constructor() {}

  private update(val: number | string) {
    this.displayValue$
      .pipe(take(1))
      .subscribe((prevValue) => this._displayValue$.next(prevValue + val));
  }
  /**
   * Removes leading zeroes
   */
  private removeLeadingZeroes(value: string): string {
    const chars = value.split('');
    const indexOfNum = chars.findIndex((char) => char !== '0');
    return chars.slice(0, indexOfNum).join('');
  }
  /**
   * Evaluates the value using `eval` which is somewhat dangerous, but
   * should be ok for now.
   */
  private eval(value: string): number {
    return eval(value);
  }
  /**
   * Gets the current value, evaluates it, then updates the string value
   */
  public equals() {
    this.displayValue$.pipe(take(1)).subscribe((value) => {
      this.update(this.eval(value));
    });
  }

  public clear() {
    this._displayValue$.next('');
  }

  public enterNumber(num: number) {
    this.update(num);
  }

  public enterDecimal() {
    this.update('.');
  }

  public times() {
    this.update('*');
  }

  public divide() {
    this.update('/');
  }

  public add() {
    this.update('+');
  }

  public subtract() {
    this.update('-');
  }
}
