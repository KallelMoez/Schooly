import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private deleteButtonClickSubject = new Subject<void>();

  deleteButtonClicked$ = this.deleteButtonClickSubject.asObservable();

  emitDeleteButtonClick() {
    this.deleteButtonClickSubject.next();
  }
  constructor() { }
}
