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
            this.apiService.httpErrorType=error.status;
            return throwError(error);
          }
          else if((error.status==500) || (error.status==504)){
              this.httpErrorType=error.status;
              this.httpErrorMsg = "Error del servidor. Intente nuevamente en unos minutos...";
          }
          else if(error.status==404||error.status==400){
            this.httpErrorType =error.status;
            if(error.error.error){
              this.httpErrorMsg=error.error.error
            } else {
              this.httpErrorMsg = error.error.err;
            }
          }
          this.apiService.httpErrorMsg=this.httpErrorMsg;
          this.apiService.httpErrorType=this.httpErrorType;
          console.log("Error: " +this.httpErrorType +" "+ this.httpErrorMsg);
          console.log("Apiservice Error: " +this.apiService.httpErrorType +" "+ this.apiService.httpErrorMsg);
          const errorMessage = this.setError(error);
          return throwError(errorMessage);
        })
      );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Ocurrió un error desconocido';
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
