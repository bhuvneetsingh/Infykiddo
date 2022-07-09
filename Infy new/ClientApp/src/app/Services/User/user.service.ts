import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from '../../Interfaces/User';
import { ICourse } from '../../Interfaces/Course';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  courses: ICourse[] = [];
  Users: IUser[] = [];
  constructor(private http: HttpClient) { }
  validateCredentials(Email: string, Pname: string, Lname: string, Lage:number, Password:string): Observable<string> {
    var UserObj: IUser;
    UserObj = { userId:0,email: Email, pname: Pname, lname: Lname, lage: Lage, password: Password };
    return this.http.post<string>('https://localhost:5001/api/Admin/AddUser', UserObj).pipe(catchError(this.errorHandler));
  }
  getCourses(): Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('https://localhost:5001/api/Admin/Parentcourses');
    return tempVar;
  }
  learnerCourses(): Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('https://localhost:5001/api/Admin/Learnercourses');
    return tempVar;
  }
  getUsers(): Observable<IUser[]> {
    let tempVar = this.http.get<IUser[]>('https://localhost:5001/api/Admin/UserProfile');
    return tempVar;
  }
  view(courseId: number): Observable<string> {
    var cartObj: ICourse;
    cartObj = {
      courseId: courseId, trainerId: 0, minAge: 0, maxAge: 0, cdur: 0, cname: "", preReq: "", cdesc: "", approval: false
    };
    return this.http.post<string>('https://localhost:5001/api/Admin/View', cartObj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
