import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CALC_BUTTONS } from './calc-buttons';
import { CalculatorService } from './calculator.service';

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
        <div fxFlex="70" fxFlex.lt-md="80" fxLayout="column">
          <ng-container *ngFor="let rowButtons of calcButtons">
            <div
              fxLayout="row"
              fxLayoutAlign="space-between center"
              class="calc-row"
            >
              <ng-container *ngFor="let button of rowButtons">
                <div class="calc-button">
                  <button
                    fxFlex
                    type="button"
                    mat-raised-button
                    [id]="button.word"
                    (click)="enterNumber(button.value)"
                  >
                    {{ button.value }}
                  </button>
                </div>
              </ng-container>
            </div>
          </ng-container>
        </div>
        <div fxFlex="30" fxFlex.lt-md="20">
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
            <div class="calc-action">
              <button
                fxFlex
                type="button"
                mat-raised-button
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
        width: 33%;
        padding: 0.5rem;
        font-size: 2rem;
      }
    `,
    `
      .calc-action {
        width: 100%;
        padding: 0.5rem;
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

  public enterNumber(num: number | '.' | 'C') {
    if (num === 'C') {
      return this.clear();
    }
    if (num === '.') {
      return this.calculator.enterDecimal();
    }
    this.calculator.enterNumber(num);
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
