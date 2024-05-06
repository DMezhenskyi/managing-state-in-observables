import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subject, fromEvent, map, merge, scan } from 'rxjs';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-page-click-counter',
  standalone: true,
  imports: [AsyncPipe, NgStyle, MatButtonModule],
  template: `
    <section class="app-description">
      <div>
        <h1>Page Click Visualizer</h1>
        <p>Start clicking around the page...</p>
      </div>
    </section>
    <div>
      <button mat-stroked-button (click)="reset$.next(); $event.stopPropagation()">
        Reset State
      </button>
    </div>
    @for (click of clicks$ | async; track $index) {
      <div
        [style.left.px]="click.clientX"
        [style.top.px]="click.clientY"
        class="click"></div>
    }`,
})
export class PageClickCounterComponent {
  protected reset$ = new Subject<void>();

  clicks$ = merge(
    fromEvent<PointerEvent>(document, 'click').pipe(map(accumulationHandler)),
    this.reset$.pipe(map(resetHandler))
  ).pipe(
    scan((state: PointerEvent[], stateHandlerFn) => stateHandlerFn(state), [])
  );
}

const accumulationHandler = (event: PointerEvent) => (state: PointerEvent[]) =>
  [...state, event];
const resetHandler = (event: void) => (state: PointerEvent[]) => [];
