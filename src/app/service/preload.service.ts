import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  constructor(private http: HttpClient) {}

  launch(): Promise<boolean> {
    return new Promise ( resolve => {
      // this.getData().subscribe(response => {
      // });
      resolve(true);

    })
  }

  private getData(): Observable<any> {
    return this.http.get<any>(`${Config.get().api}launch`);
  }
}
