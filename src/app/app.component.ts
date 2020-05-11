import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'calc-root',
  template: `
    <main class="mat-app-background mat-typography dark-theme">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'fcc-calculator';
}
