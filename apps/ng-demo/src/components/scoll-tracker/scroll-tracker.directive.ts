import { Directive, OnDestroy, OnInit, output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTrackerDirective implements OnDestroy, OnInit {
  readonly scrollingFinished = output();
  subscriptions!: Subscription;

  ngOnInit(): void {
    this.subscriptions = fromEvent(window, 'scroll')
      .pipe(debounceTime(500))
      .subscribe((_) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.scrollingFinished.emit();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
