import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  drawing: Subject<boolean> = new Subject<boolean>();
  navHeight: BehaviorSubject<number> = new BehaviorSubject<number>(73);
  appStart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
