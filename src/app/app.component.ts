import { Component } from '@angular/core';

@Component({
  selector: 'calc-root',
  template: `
    <main class="mat-app-background mat-typography dark-theme">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'fcc-calculator';
}
