/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Injectable } from '@angular/core';
import { ICourse } from '../../Interfaces/Course';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {
  courses: ICourse[] = [];
  constructor(private http: HttpClient) { }

  getCourses():Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('https://localhost:5001/api/Admin/GetCourses');
    return tempVar;
  }
  ViewCourses(): Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('https://localhost:5001/api/Admin/ViewCourses');
    return tempVar;
  }
  Delete(courseId: number): Observable<boolean> {
    var cartObj: ICourse;
    cartObj = {
      courseId: courseId, trainerId: 0, minAge: 0, maxAge: 0, cdur: 0, cname: "", preReq: "", cdesc: "", approval: false };
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: cartObj };
    return this.http.delete<boolean>('https://localhost:5001/api/Admin/DeleteCourse', httpOptions).pipe(catchError(this.errorHandler));
  }
  Update(courseId: number): Observable<boolean> {
    var cartObj: ICourse;
    cartObj = {
      courseId: courseId, trainerId: 0, minAge: 0, maxAge: 0, cdur: 0, cname: "", preReq: "", cdesc: "", approval: true
    };
    return this.http.put<boolean>('https://localhost:5001/api/Admin/Update', cartObj).pipe(catchError(this.errorHandler));
  }
  Enroll(courseId: number): Observable<boolean> {
    var cartObj: ICourse;
    cartObj = {
      courseId: courseId, trainerId: 0, minAge: 0, maxAge: 0, cdur: 0, cname: "", preReq: "", cdesc: "", approval: true
    };
    return this.http.post<boolean>('https://localhost:5001/api/Admin/Enroll', cartObj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
