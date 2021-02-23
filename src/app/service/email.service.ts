import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { FormRequest } from '../models/form-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(value: FormRequest): Observable<boolean> {
    return this.http.post<boolean>(`${Config.get().api}mail`, value);
  }
}
