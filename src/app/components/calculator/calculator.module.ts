import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { CalculatorComponent } from './calculator.component';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,

    // Material
    FlexModule,
    MatButtonModule
  ],
  exports: [CalculatorComponent]
})
export class CalculatorModule {}
