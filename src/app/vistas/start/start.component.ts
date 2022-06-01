import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {PostPacienteInterface} from "../../modelos/postPacienteInterface";
import {ApiService} from "../../servicios/api/api.service";
import {PacienteInterface} from "../../modelos/paciente.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

  control: FormControl = new FormControl('');

  paciente: PacienteInterface = {
    pacienteId: 0,
    nombres: "",
    apellido: "",
    apyNom: "",
    fechaNacim: "",
    sexo: "",
    estadoCivilId: 0,
    tipoDocumentoId: "",
    tipoDocumentoIdDesc: "",
    nroDocumento: "",
    calle: "",
    alturaCalle: "",
    piso: "",
    departamento: "",
    localidadId: 0,
    provinciaId: 0,
    paisId: 0,
    codPos: "",
    ctaCte: "",
    historiaClinica: 0,
    ondicionIVAId: 0,
    email: "",
    emailActivo: "",
    exentoIIBBPciaBsas: "",
    tipoImpuestoIIBBId: 0,
    impuestoIIBBPciaBsasId: 0,
    sysInactivo: 0,
    sysFechac: "",
    sysLoginc: "",
    sysHostc: "",
    sysFecham: "",
    sysLoginm: "",
    sysHostm: "",
    paisNacimientoId: 0,
    beneficiario: "",
    exentoIIBBCapfed: "",
    impuestoIIBBCapfedId: 0,
    mor: "",
    telemedicina: "",
    benefactor: "",
    carpetaHc: "",
    respApellido: "",
    respNombre: "",
    respTipoDocId: 0,
    respNroDoc: "",
    respEmail: "",
    respSexo: "",
    respParentescoId: 0,
    respTel1: "",
    respCalle: "",
    respLocalidadId: 0,
    respProvinciaId: 0,
    respPaisId: 0,
    respCodPos: "",
    consentEstudioInternet: "",
    alerta: "",
    empadronado: "",
    direccion: "",
    habilitarPortal: "",
    habilitarPortalResp: "",
    telefonos: [
        {
            telefonoId: "",
            numero: "",
            tipoTelefonoId: ""
        }
    ]
  };
  postPaciente: PostPacienteInterface = {
    "app": "",
    "id": "",
    "pacienteId": ""
  };
  startForm = new FormGroup({
    pacienteId: new FormControl('', Validators.required),
    accesoId: new FormControl('', Validators.required),
  })
  httpErrorMsg:any="";
  httpErrorType:number=0;
/*    Errores:
    0: no hay error
    500: timeout error
    504: timeout error
    404: paciente no encontrado
    404: combinación paciente y accesion inexistente
*/
  loading:boolean=false;
  pacienteExiste:boolean=false;
  accesoId = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);
  pacienteId = new FormControl('', [Validators.required]);
  checkinSites: any;

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute, private http:HttpClient){ }

  ngOnInit(): void {
    this.api.getCheckinSites().subscribe(
      (data:any) =>{
        this.checkinSites=data;
        console.log(data);
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  getErrorMessage() {
    if (this.accesoId.hasError('required')) {
      return 'ingrese un código de 13 digitos';
    }
    return '';
  }

  getPacienteUrl(tokenUrl: string){
    this.loading=true;
    this.api.getPacienteUrl(tokenUrl).subscribe(
      (data:PacienteInterface)=>{
        this.paciente=data;
        this.pacienteExiste=true;
        this.httpErrorMsg = "";
        this.httpErrorType = 0;
        localStorage.setItem("beneficiario",this.paciente.apyNom);
        localStorage.setItem("emailPaciente", this.paciente.emailActivo);
        localStorage.setItem("pacienteId", this.paciente.pacienteId.toString());
        localStorage.setItem("accession", this.accesoId.value);
        this.loading=false;
      }, error => {
        this.paciente = {
          pacienteId: 0,
          nombres: "",
          apellido: "",
          apyNom: "",
          fechaNacim: "",
          sexo: "",
          estadoCivilId: 0,
          tipoDocumentoId: "",
          tipoDocumentoIdDesc: "",
          nroDocumento: "",
          calle: "",
          alturaCalle: "",
          piso: "",
          departamento: "",
          localidadId: 0,
          provinciaId: 0,
          paisId: 0,
          codPos: "",
          ctaCte: "",
          historiaClinica: 0,
          ondicionIVAId: 0,
          email: "",
          emailActivo: "",
          exentoIIBBPciaBsas: "",
          tipoImpuestoIIBBId: 0,
          impuestoIIBBPciaBsasId: 0,
          sysInactivo: 0,
          sysFechac: "",
          sysLoginc: "",
          sysHostc: "",
          sysFecham: "",
          sysLoginm: "",
          sysHostm: "",
          paisNacimientoId: 0,
          beneficiario: "",
          exentoIIBBCapfed: "",
          impuestoIIBBCapfedId: 0,
          mor: "",
          telemedicina: "",
          benefactor: "",
          carpetaHc: "",
          respApellido: "",
          respNombre: "",
          respTipoDocId: 0,
          respNroDoc: "",
          respEmail: "",
          respSexo: "",
          respParentescoId: 0,
          respTel1: "",
          respCalle: "",
          respLocalidadId: 0,
          respProvinciaId: 0,
          respPaisId: 0,
          respCodPos: "",
          consentEstudioInternet: "",
          alerta: "",
          empadronado: "",
          direccion: "",
          habilitarPortal: "",
          habilitarPortalResp: "",
          telefonos: [
              {
                  telefonoId: "",
                  numero: "",
                  tipoTelefonoId: ""
              }
          ]
        };
        this.httpErrorType = this.api.httpErrorType;
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.loading=false;
      });
  }

  getPacienteUrlSync(tokenUrl: string):Promise<any>{
    this.loading=true;
    return this.api.getPacienteUrl(tokenUrl).toPromise();
  }

  async sendCodeSync(form: any){
    this.getPacienteUrlSync(form.pacienteId)
    .then((paciente)=>{ if ((paciente!=null) && (paciente.pacienteId==form.pacienteId)) {
      this.postPaciente.app='RIS';
      this.postPaciente.pacienteId=form.pacienteId.toString();
      this.postPaciente.id=form.accesoId.toString();
        this.api.sendCode(this.postPaciente).subscribe(
          (data:any) =>{
            if(data){
              localStorage.setItem("beneficiario",paciente.apyNom);
              localStorage.setItem("emailPaciente", paciente.emailActivo);
              localStorage.setItem("pacienteId", paciente.pacienteId.toString());
              localStorage.setItem("accession", form.accesoId.toString());
              localStorage.setItem("estudios",data.urlStudy);
              this.router.navigate(['check-in-formulario']);
            } else {
              this.httpErrorMsg = data.msg;
              this.httpErrorType=data.status;
            }
              this.loading=false;
          }, error =>{
              this.httpErrorMsg=this.api.httpErrorMsg;
              this.httpErrorType=this.api.httpErrorType;
              this.loading=false;
          });
    };
   this.loading=false;
  }); 
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  gotoFinish(){
    this.router.navigate(['check-in-formulario']);
  }

}
