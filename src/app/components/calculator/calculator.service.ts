import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private readonly OPERATORS = ['*', '+', '-', '/'];
  private _displayValue$ = new BehaviorSubject<string>('');
  public displayValue$: Observable<string> = this._displayValue$.pipe(
    map(this.removeLeadingZeroes.bind(this))
    // tap(console.log)
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
    const chars = value.toLocaleLowerCase().split('');
    const indexOfNum = chars.findIndex((char) => char !== '0');
    if (indexOfNum === 0) {
      return chars.join('');
    }
    const nextIsOperator =
      chars.length === 2 && this.OPERATORS.includes(chars[1]);
    if (nextIsOperator) {
      return chars.join('');
    }
    return chars.slice(indexOfNum, chars.length).join('');
  }
  /**
   * Evaluates the value using `eval` which is somewhat dangerous, but
   * should be ok for now.
   */
  private eval(value: string): number {
    return eval(value);
  }
  /**
   * Removes duplicate operators so only the last
   * operator is used. Except if the last operator is a `-` sign,
   * then this is not considered.
   */
  private removeDupOperators(value: string): string {
    return value
      .split('')
      .filter((char, index, chars) => {
        if (!this.OPERATORS.includes(char)) {
          return true;
        }
        const nextChar = chars[index + 1];
        if (nextChar === undefined) {
          // we are at the end of the string
          return true;
        }
        const isDupOperator = this.OPERATORS.includes(nextChar);
        if (isDupOperator && nextChar === '-') {
          // if the next operator is '-', the value could be negative,
          // so we can let it.

          // unless the **next next** operator is also a negative, then
          // this is a duplicate and don't add it.
          const isNextNextMinus = chars[index + 2] === '-';
          if (isNextNextMinus) {
            return false;
          }
          return true;
        }
        if (isDupOperator) {
          return false;
        }
        return true;
      })
      .join('');
  }
  /**
   * Gets the current value, evaluates it, then updates the string value
   */
  public equals() {
    this.displayValue$
      .pipe(
        take(1),
        filter((_) => !!_),
        map((value) => this.removeDupOperators(value)),
        tap((val) => console.log('>> ', val))
      )
      .subscribe((value) => this._displayValue$.next('' + this.eval(value)));
  }

  public clear() {
    this._displayValue$.next('');
  }

  public enterNumber(num: number) {
    this.update(num);
  }
  /**
   * User's can only enter a decimal if there isn't already
   * a decimal point in the "last number".
   */
  private canEnterDecimal(value: string): boolean {
    const matches = /[\d|.]+$/.exec(value);
    if (!matches) {
      return true;
    }
    const [lastNumber] = matches;
    if (lastNumber == undefined) {
      return true;
    }
    const hasDecimalAlready = lastNumber.includes('.');
    if (hasDecimalAlready) {
      return false;
    }
    return true;
  }

  public enterDecimal() {
    if (this.canEnterDecimal(this._displayValue$.value)) {
      this.update('.');
    }
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
