import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  products: IProduct[] = [];
  constructor(private http: HttpClient) { }
  getProducts() : Observable < IProduct[] > {
    let tempVar = this.http.get<IProduct[]>('https://localhost:5001/api/Admin/GetUsers').pipe(catchError(this.errorHandler));;
      return tempVar;
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
