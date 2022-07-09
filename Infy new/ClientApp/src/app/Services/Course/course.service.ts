/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICourse } from '../../Interfaces/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  validateCredentials(Cname: string, MinAge: number, MaxAge: number, CourseDuration: number, Prereq: string, Description: string): Observable<string> {
    var userObj: ICourse;
    userObj = { trainerId: 0, courseId: 0, cname: Cname, minAge: MinAge, maxAge: MaxAge, cdur: CourseDuration, preReq: Prereq, cdesc: Description, approval: false };
    return this.http.post<string>('https://localhost:5001/api/Admin/Addcourse', userObj).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
