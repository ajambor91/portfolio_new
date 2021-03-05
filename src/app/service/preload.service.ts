import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  constructor(private http: HttpClient, private httpService: HttpService) {}

  launch(): Promise<boolean> {
    return new Promise ( resolve => {
      this.getData().subscribe(response => {
        this.httpService.token.next(response);
        resolve(true);
      });

    })
  }

  private getData(): Observable<any> {
    console.log('fsdfdsfdsfhdfskjdhfkj')
    return this.http.get<any>(`${Config.get().api}auth/login`);
  }
}
