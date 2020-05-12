import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageInputService {
  private _keypress = new Subject<KeyboardEvent>();
  @HostListener('document:keypress', ['$event'])
  public keypress(key: KeyboardEvent) {
    this._keypress.next(key);
  }
}
