import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  drawing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
