import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ITrainer } from '../../Interfaces/Trainer';

@Injectable({
  providedIn: 'root'
})
export class TLoginService {

  constructor(private http: HttpClient) { }
  validateCredentials(y: string, password: string): Observable<string> {
    var userObj: ITrainer;
    userObj = { trainerId:Number(y),email: "", tname: "", cnum: "", password: password };
    return this.http.post<string>('https://localhost:5001/api/Admin/ValidateTrainerCredentials', userObj).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
