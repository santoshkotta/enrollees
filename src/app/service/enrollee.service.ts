import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Enrollee } from '../../../src/app/model/enrollee.model';

@Injectable({
  providedIn: 'root'
})
export class EnrolleeService {

  constructor(private http: HttpClient) { }

  getEnrollees(): Observable<Enrollee[]> {
    return this.http
      .get<Enrollee[]>(`${environment.apiBaseUrl}/enrollees`)
      .pipe(catchError((error: any) => throwError(error)));
  }


  getEnrollee(id: number): Observable<Enrollee> {
    return this.http
      .get<Enrollee>(`${environment.apiBaseUrl}/enrollees/${id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateEnrollee(payload: Enrollee): Observable<Enrollee> {
    return this.http
      .put<Enrollee>(`${environment.apiBaseUrl}/enrollees/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
