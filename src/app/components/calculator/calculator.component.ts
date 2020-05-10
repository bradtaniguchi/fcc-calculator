import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CALC_BUTTONS } from './calc-buttons';
import { CalculatorService } from './calculator.service';
import { CalcButton } from './calc-button';

@Component({
  selector: 'calc-calculator',
  template: `
    <div fxFlexFill fxLayout="column" FxFlex>
      <div
        class="calc-display"
        #calcDisplay
        id="display"
        fxLayoutAlign="end center"
      >
        {{ (displayValue$ | async) || 0 }}
      </div>
      <div fxLayout="row" style="height: 100%">
        <!-- number buttons -->
        <div fxFlex="70" fxLayout="column">
          <ng-container *ngFor="let rowButtons of calcButtons">
            <div
              fxLayout="row"
              fxLayoutAlign="space-between center"
              class="calc-row"
            >
              <ng-container *ngFor="let button of rowButtons">
                <div class="calc-button" fxFlex>
                  <button
                    fxFlex
                    type="button"
                    mat-raised-button
                    [id]="button.word"
                    [color]="getColor(button)"
                    (click)="enterNumber(button.value)"
                  >
                    {{ button.value }}
                  </button>
                </div>
              </ng-container>
            </div>
          </ng-container>
        </div>
        <div fxFlex="30">
          <div fxLayout="row" fxLayoutAlign="center" class="calc-row">
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="multiply"
                (click)="times()"
              >
                X
              </button>
            </div>
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="divide"
                (click)="divide()"
              >
                /
              </button>
            </div>
          </div>
          <div fxLayout="row" fxLayoutAlign="center" class="calc-row">
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="add"
                (click)="add()"
              >
                +
              </button>
            </div>
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="subtract"
                (click)="subtract()"
              >
                -
              </button>
            </div>
          </div>
          <div fxLayout="row" fxLayoutAlign="center" style="height: 40vh">
            <!-- TODO: add credits and settings -->
            <div class="calc-action" fxLayout="column">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="backspace"
                (click)="backspace()"
                fxLayout="column"
                fxLayoutAlign="center center"
              >
                <mat-icon>
                  keyboard_backspace
                </mat-icon>
              </button>
              <div fxFlex></div>
            </div>
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
                color="primary"
                id="equals"
                (click)="equals()"
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .calc-display {
        height: 30vh;
        font-size: 24px;
        padding: 24px;
      }
    `,
    `
      .calc-row {
        height: 20vh;
      }
    `,
    `
      .calc-button {
        height: 100%;
        font-size: 2rem;
      }
    `,
    `
      .calc-action {
        width: 100%;
      }
    `,
    `
      .calc-submit {
        width: 100%;
        height: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  public readonly calcButtons = CALC_BUTTONS;
  public displayValue$: Observable<string>;
  constructor(private calculator: CalculatorService) {}

  ngOnInit(): void {
    this.displayValue$ = this.calculator.displayValue$;
  }
  public getColor(button: CalcButton) {
    return button.word === 'clear' ? 'primary' : '';
  }
  public enterNumber(num: number | '.' | 'C') {
    if (num === 'C') {
      return this.clear();
    }
    if (num === '.') {
      return this.calculator.enterDecimal();
    }
    this.calculator.enterNumber(num);
  }

  public backspace() {
    this.calculator.backspace();
  }

  public clear() {
    this.calculator.clear();
  }

  public equals() {
    this.calculator.equals();
  }

  public times() {
    this.calculator.times();
  }

  public divide() {
    this.calculator.divide();
  }

  public add() {
    this.calculator.add();
  }

  public subtract() {
    this.calculator.subtract();
  }
}
