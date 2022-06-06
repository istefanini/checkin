import { PacienteInterface } from './../../modelos/paciente.interface';
import { SnackbarPopupComponent } from '../../plantillas/snackbar-popup/snackbar-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  control: FormControl = new FormControl('');

  firstFormGroup = new FormGroup({
    pacienteId:  new FormControl('', Validators.required),
  });
  secondFormGroup = new FormGroup({
    nombre:  new FormControl('', Validators.required),
    apellido:  new FormControl('', Validators.required),
    dni:  new FormControl('', Validators.required),
    nacimiento:  new FormControl('', Validators.required),
    sexo:  new FormControl('', Validators.required),
    checkinReason:  new FormControl('', Validators.required),
  });
  nombre = new FormControl('', [Validators.required]);
  pacienteId = new FormControl('', [Validators.required]);

  constructor(private api:ApiService, private snackbar: MatSnackBar, private router: Router,private _formBuilder: FormBuilder){ }

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

  loading:boolean=false;
  linkEstudios:any=localStorage.getItem('estudios');
  beneficiario: any = localStorage.getItem('beneficiario');
  emailPaciente: any = localStorage.getItem('emailPaciente');
  accession: any = localStorage.getItem('accession');
  httpErrorMsg:any="";
  httpErrorType:number=0;
  checkinReasons: any;

  getPaciente(pacienteId: string){
    this.api.getPaciente(pacienteId).subscribe(
      (data:any) =>{
        this.paciente=data;
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

  goBack(){
    this.router.navigate(['check-in']);
  }

}