import { Component } from '@angular/core';
import { Observable, Subject, ReplaySubject, from, of, range, interval } from 'rxjs';
import { map, filter, switchMap, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  max = 1;
  current = 0;
  start() {
    const intervalapp = interval(100);
        intervalapp.pipe(takeWhile( _ => !this.isFinished ));
        intervalapp.pipe(tap(  i => this.current += 0.1 ));
        intervalapp.subscribe();
          //
  }
  finish() {
    this.current = 0;
  }
  reset() {
    this.current = 0;
  }
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }
  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }
  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
