import { TurnoInterface } from './../../modelos/turno.interface';
import { PostPacienteInterface } from './../../modelos/postPacienteInterface';
import { PacienteInterface } from './../../modelos/paciente.interface';
import { SnackbarPopupComponent } from '../../plantillas/snackbar-popup/snackbar-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {StepperSelectionEvent, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  identificationForm= this.formBuilder.group({
    pacienteId: [''],
  })
  pacienteForm= this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    dni: ['', Validators.required],
    nacimiento: ['', Validators.required],
    sexo: ['', Validators.required],
    checkinReason: ['', Validators.required],
  })
  turno: any ={
      id: 0,
      resource: "",
      practice: "",
      fromDateTime: "",
      toDateTime: "",
      consultingRoom: ""
  }
  paciente: PacienteInterface = {
    Identity: {
        type: "",
        number: 0,
        lasName: "",
        firsName: "",
        birthdate: "",
        sex: ""
    },
    appointments: [],
    isPatient: true,
    reasonId: "",
    formInput: true,
    error: "",
  }
  postPaciente: PostPacienteInterface = {
      Identity: {
        type: "DNI",
        number: 0,
        lasName: "",
        firsName: "",
        birthdate: "",
        sex: ""
    },
    reasonId: "",
    formInput: true,
  }
  theTime: any;
  loading:boolean=false;
  httpErrorMsg:any="";
  httpErrorType:number=0;
  checkinReasons: any;
  registroExitoso: boolean = false;

  constructor(private api:ApiService, private snackbar: MatSnackBar, private router: Router,private formBuilder: FormBuilder){ }

  ngOnInit(): void {
    this.api.getCheckinReasons().subscribe(
      (data:any) =>{
        this.checkinReasons=data;
        this.api.checkinSite = localStorage.getItem('siteId');
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  getPaciente(pacienteId: string){
    this.api.getPaciente(pacienteId).subscribe(
      (data:any) =>{
        this.paciente=data;
        this.pacienteForm.controls?.['nombre'].setValue(data.Identity.firsName);
        this.pacienteForm.controls?.['apellido'].setValue(data.Identity.lasName);
        this.pacienteForm.controls?.['dni'].setValue(data.Identity.number);
        // this.pacienteForm.controls?.['nacimiento'].setValue(data.Identity.birthdate);
        this.pacienteForm.controls?.['sexo'].setValue(data.Identity.sex);
        if(this.paciente.appointments){
          this.turno=this.paciente.appointments;
          this.turno=this.turno[0];
        }
        this.api.checkinSite = localStorage.getItem('siteId');
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  openSnackbar(message: string, action: string, duration: number, color: string): void{
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [color]
    });
  }

  registrarIngreso(){
    console.log(this.pacienteForm.value);
    this.postPaciente={
      Identity: {
        type: "DNI",
        number: this.pacienteForm.value.dni,
        lasName: this.pacienteForm.value.apellido,
        firsName: this.pacienteForm.value.nombre,
        birthdate: this.pacienteForm.value.nacimiento,
        sex: this.pacienteForm.value.sexo
    },
    reasonId: this.pacienteForm.value.checkinReason.id,
    formInput: true,
    };
    this.api.postPaciente(this.postPaciente).subscribe(
      (data:any) =>{
        console.log(data);
        this.theTime= new Date().toLocaleString();
        this.registroExitoso=true;
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  resetAll(){
    this.identificationForm.reset;
    this.pacienteForm.reset;
    this.paciente= {
      Identity: {
          type: "",
          number: 0,
          lasName: "",
          firsName: "",
          birthdate: "",
          sex: ""
      },
      appointments: [],
      isPatient: true,
      reasonId: "",
      formInput: true,
      error: "",
    }
    this.postPaciente= {
      Identity: {
        type: "DNI",
        number: 0,
        lasName: "",
        firsName: "",
        birthdate: "",
        sex: ""
    },
    reasonId: "",
    formInput: true,
  }
    this.theTime=null;
    this.loading=false; 
    this.httpErrorMsg="";
    this.httpErrorType=0;
    this.registroExitoso= false;
  }

  goBack(){
    this.router.navigate(['check-in']);
  }

}