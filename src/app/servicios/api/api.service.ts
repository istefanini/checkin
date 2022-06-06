import { PostPacienteInterface } from './../../modelos/postPacienteInterface';
import { Injectable } from '@angular/core';
import {PacienteInterface} from "../../modelos/paciente.interface";
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
  busquedaDni = "-search?siteId=";
  checkinSite:any="0";

  constructor( private http:HttpClient) {
    this.httpErrorMsg = "";
    this.httpErrorType = 0;
  }

  getPaciente(pacienteId:string):Observable<PacienteInterface>{
    let url:string= this.baseUrl + this.busquedaDni + this.checkinSite;
    console.log(url, pacienteId);
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

  postPaciente(postPaciente: PostPacienteInterface):Observable<any>{
    let url:string= this.baseUrl;
    console.log(url, postPaciente);
    return this.http.post<any>(url, postPaciente);
  }

}