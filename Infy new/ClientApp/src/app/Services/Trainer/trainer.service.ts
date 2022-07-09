import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICourse } from '../../Interfaces/Course';
import { ITrainer } from '../../Interfaces/Trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  courses: ICourse[] = [];
  trainers: ITrainer[] = [];
  constructor(private http: HttpClient) { }
  validateCredentials(email: string, Tname: string, Cnum: string, password: string): Observable<string> {
    var TrainerObj: ITrainer;
    TrainerObj = { trainerId:0,email: email, tname: Tname, cnum: Cnum, password: password };
    return this.http.post<string>('https://localhost:5001/api/Admin/AddTrainer', TrainerObj).pipe(catchError(this.errorHandler));
  }
  getCourses(): Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('https://localhost:5001/api/Admin/Trainercourses');
    return tempVar;
  }
  getTrainer(): Observable<ITrainer[]> {
    let tempVar = this.http.get<ITrainer[]>('https://localhost:5001/api/Admin/Trainer');
    return tempVar;
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
