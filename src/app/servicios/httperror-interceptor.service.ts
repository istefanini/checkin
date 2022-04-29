import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError, timeout, TimeoutError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ApiService} from "./api/api.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  public httpErrorMsg: string="";
  public httpErrorType: number=0;

  constructor(public apiService: ApiService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        timeout(30000),
        catchError((error: HttpErrorResponse) => {
          if(error instanceof TimeoutError){
            this.httpErrorMsg = "Error del servidor. Intente nuevamente en unos minutos...";
            this.apiService.httpErrorMsg=this.httpErrorMsg;
            this.httpErrorType = 2;
            this.apiService.httpErrorType=this.httpErrorType;
            return throwError(error);
          }
          else if(error.status==500){
              this.httpErrorType =error.status;
              if(error.error.err){
                this.httpErrorMsg = error.error.err;
              }
              else{
                this.httpErrorMsg = error.error.msg;
              }
          }
          else if(error.status==404){
              this.httpErrorMsg = error.error.error;
              this.httpErrorType =error.status;
          }
          else if(error.status==400){
            this.httpErrorMsg = error.error.error;
            this.httpErrorType =error.status;
        }
          this.apiService.httpErrorMsg=this.httpErrorMsg;
          this.apiService.httpErrorType=this.httpErrorType;
          const errorMessage = this.setError(error);
          return throwError(errorMessage);
        })
      );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status!==0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
