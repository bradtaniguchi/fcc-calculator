import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'calc-calculator',
  template: `
    <div fxFlexFill fxLayout="column" FxFlex>
      <div class="calc-display" #calcDisplay id="display">
        DISPLAY
      </div>
      <div fxLayout="row" style="height: 100%">
        <!-- number buttons -->
        <div fxFlex="70" fxFlex.lt-md="80" fxLayout="column">
          <div
            fxLayout="row"
            fxLayoutAlign="space-between center"
            class="calc-row"
          >
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="seven"
                (click)="enterNumber(7)"
              >
                7
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="eight"
                (click)="enterNumber(8)"
              >
                8
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="nine"
                (click)="enterNumber(9)"
              >
                9
              </button>
            </div>
          </div>
          <div
            fxLayout="row"
            fxLayoutAlign="space-between center"
            class="calc-row"
          >
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="seven"
                (click)="enterNumber(7)"
              >
                7
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="eight"
                (click)="enterNumber(8)"
              >
                8
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="nine"
                (click)="enterNumber(9)"
              >
                9
              </button>
            </div>
          </div>
          <div
            fxLayout="row"
            fxLayoutAlign="space-between center"
            class="calc-row"
          >
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="seven"
                (click)="enterNumber(7)"
              >
                7
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="eight"
                (click)="enterNumber(8)"
              >
                8
              </button>
            </div>
            <div class="calc-num-button">
              <button
                fxFlex
                type="button"
                mat-raised-button
                id="nine"
                (click)="enterNumber(9)"
              >
                9
              </button>
            </div>
          </div>
        </div>
        <div fxFlex="30" fxFlex.lt-md="20">
          ACTIONS
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .calc-display {
        height: 30vh;
      }
    `,
    `
      .calc-row {
        height: 25vh;
      }
    `,
    `
      .calc-num-button {
        height: 100%;
        width: 33%;
        padding: 0.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public enterNumber(num: number) {
    console.log('hit', num);
  }
}
