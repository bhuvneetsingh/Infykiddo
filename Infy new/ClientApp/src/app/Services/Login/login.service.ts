import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  validateCredentials(y: string, password: string): Observable<string> {
    var userObj: IUser;
    userObj = { userId: Number(y), email: "", pname: "", lname: "", lage: 0, password: password };
    return this.http.post<string>('https://localhost:5001/api/Admin/ValidateUserCredentials', userObj).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
