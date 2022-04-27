import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import {PostPacienteInterface} from "../../modelos/postPacienteInterface";
import {ApiService} from "../../servicios/api/api.service";
import {ResponseInterface} from "../../modelos/response.interface";
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
    1: error en la url o token invalido
    2: timeout error
    401: codigo de seguridad erroneo
    402: credencial erronea
*/
  loading:boolean=false;
  public token:any="";
  accesoId = new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]);
  pacienteId = new FormControl('', [Validators.required]);

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute){ }

  getErrorMessage() {
    if (this.accesoId.hasError('required')) {
      return 'ingrese un código de 13 digitos';
    }
    return '';
  }

  ngOnInit(): void {
  }

  getPacienteUrl(tokenUrl: string){
    console.log("buscando paciente "+ tokenUrl);
    this.loading=true;
    this.api.getPacienteUrl(tokenUrl).subscribe(
      (data:PacienteInterface)=>{
        this.paciente=data;
        // this.startForm.patchValue({
        //   pacienteId: this.paciente.pacienteId,
        // });
        if(this.paciente && (this.httpErrorMsg!=402)){
          this.options[0]=this.paciente.apyNom;
          console.log(this.options);
          // if(data.urlEstudios.length>0){
          //   localStorage.setItem("estudios", data.urlEstudios);
          //   this.router.navigate(['ris-link-send-mail']);
          // }
        } else {
          this.httpErrorMsg = this.api.httpErrorMsg;
          this.options[0]="No hay pacientes con ese Id";
        }
        this.loading=false;
      }, error => {
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.loading=false;
      });
  }

  sendCode(form: any){
    this.loading=true;
    this.postPaciente.app='RIS';
    this.postPaciente.pacienteId=form.pacienteId.toString();
    this.postPaciente.id=form.accesoId.toString();
    console.log(this.postPaciente);
    this.api.sendCode(this.postPaciente).subscribe(
      (data:any) =>{
      if(data){
        console.log(data);
        localStorage.setItem("beneficiario",this.paciente.apyNom);
        localStorage.setItem("estudios",data.urlStudy);
        this.router.navigate(['ris-link-send-mail']);
      } else {
        this.httpErrorMsg = data.msg;
        this.httpErrorType=data.status;
      }
        this.loading=false;
    }, error =>{
        this.loading=false;
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        console.log(this.httpErrorMsg);
        console.log(this.httpErrorType);
        console.log(error);
    })
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

  options: string[] = [];
}
