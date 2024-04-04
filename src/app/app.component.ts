import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageClickCounterComponent } from './page-click-counter/page-click-counter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, PageClickCounterComponent],
  template: `
    <mat-toolbar color="primary">RxJS | Click Map</mat-toolbar>
    <main class="content mat-elevation-z1">
      <app-page-click-counter />
    </main>
  `,
  styles: [
    `
      .content {
        height: calc(100vh - 64px - 70px);
        margin: 20px;
        background-color: white;
        padding: 20px;
        border-radius: 12px;
        position: relative;
        overflow: hidden;
      }
    `,
  ],
})
export class AppComponent {}
