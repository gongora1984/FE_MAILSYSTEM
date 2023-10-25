import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class CoreComponent implements OnDestroy {
  protected onDestroy = new Subject<void>();

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
