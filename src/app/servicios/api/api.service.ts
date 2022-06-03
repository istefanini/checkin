import { Injectable } from '@angular/core';
import {PacienteInterface} from "../../modelos/paciente.interface";
import {PostPacienteInterface} from "../../modelos/postPacienteInterface";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment.api-mock";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public httpErrorMsg: any;
  public httpErrorType: number;
  baseUrl = environment.baseUrl;
  ubicacionesUrl = "-sites";
  motivosIngresoUrl = "-reason";
  busquedaDni = "-search?siteId="

  constructor( private http:HttpClient) {
    this.httpErrorMsg = "";
    this.httpErrorType = 0;
  }

  getPaciente(pacienteId:string):Observable<PacienteInterface>{
    let url:string= this.baseUrl + this.busquedaDni + "1";
    return this.http.post<PacienteInterface>(url, pacienteId);
  }

  getCheckinSites():Observable<any>{
    let url:string= this.baseUrl+this.ubicacionesUrl;
    return this.http.get<any>(url);
  }

  getCheckinReasons():Observable<any>{
    let url:string= this.baseUrl+this.motivosIngresoUrl;
    return this.http.get<any>(url);
  }

}