import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalculatorComponent } from './calculator.component';
import { PageInputService } from './page-input.service';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,

    // Material
    FlexModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [CalculatorComponent]
})
export class CalculatorModule {
  // this is injected so it can start "watching" for page inputs
  constructor(private pageInput: PageInputService) {}
}
