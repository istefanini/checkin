import { Injectable } from '@angular/core';
import {PacienteInterface} from "../../modelos/paciente.interface";
import {PostPacienteInterface} from "../../modelos/postPacienteInterface";
import {ResponseInterface} from "../../modelos/response.interface";
import {SendMailInterface} from "../../modelos/sendMail.interface";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment.api-mock";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public httpErrorMsg: string;
  public httpErrorType: number;
  baseUrl = environment.baseUrl;
  postUrl = "http://172.16.1.243:4010/api-middleware-link-ris/api/v1/link-studie-check";
  sendMailUrl = environment.sendMailUrl;

  constructor( private http:HttpClient) {
    this.httpErrorMsg = "";
    this.httpErrorType = 0;
  }

  getPacienteUrl(pacienteId:string):Observable<PacienteInterface>{
    let url:string= this.baseUrl + "?pacienteId=" + pacienteId;
    return this.http.get<PacienteInterface>(url);
  }

  sendCode(postPaciente:PostPacienteInterface):Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>("/api-middleware-link-ris/api/v1/link-studie-check", postPaciente);
  }

  sendMail(sendMailInterface: SendMailInterface):Observable<any>{
    return this.http.post<any>(this.sendMailUrl, sendMailInterface);
  }

}
