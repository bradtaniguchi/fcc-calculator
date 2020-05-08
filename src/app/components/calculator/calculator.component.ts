import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalcButton } from './calc-button';
import { CALC_BUTTONS } from './calc-buttons';

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
          <div
            fxLayout="row"
            fxLayoutAlign="space-between center"
            class="calc-row"
          >
            <div class="calc-button">
              <button fxFlex type="button" mat-raised-button id=""></button>
            </div>
            <div></div>
          </div>
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  public readonly calcButtons = CALC_BUTTONS;
  constructor() {}

  ngOnInit(): void {}

  public enterNumber(num: number) {
    console.log('hit', num);
  }
}
