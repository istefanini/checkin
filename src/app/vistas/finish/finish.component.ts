import { SnackbarPopupComponent } from '../../plantillas/snackbar-popup/snackbar-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { SendMailInterface } from "../../modelos/sendMail.interface";
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

  firstFormGroup: FormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = new FormGroup({
    nombre:  new FormControl('', Validators.required),
  });
  nombre = new FormControl('', [Validators.required]);

  constructor(private api:ApiService, private snackbar: MatSnackBar, private router: Router,private _formBuilder: FormBuilder){ }

  ngOnInit(): void {
    this.api.getCheckinReasons().subscribe(
      (data:any) =>{
        this.checkinReasons=data;
        console.log(data);
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  loading:boolean=false;
  linkEstudios:any=localStorage.getItem('estudios');
  beneficiario: any = localStorage.getItem('beneficiario');
  pacienteId: any = localStorage.getItem('pacienteId');
  emailPaciente: any = localStorage.getItem('emailPaciente');
  accession: any = localStorage.getItem('accession');
  postMail: SendMailInterface = {
    "pacienteId": "",
    "accession": "",
    "emails": []
  };
  httpErrorMsg:any="";
  httpErrorType:number=0;
  // httpErrorType=1 --> significa que el mail se encoló correctamente;
  checkinReasons: any;

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.linkEstudios);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  openSnackbar(message: string, action: string, duration: number, color: string): void{
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [color]
    });
  }

  sendMail(){
    this.loading=true;
    this.postMail={
      "pacienteId": this.pacienteId,
      "accession": this.accession,
      "emails" : [this.emailPaciente,"istefanini@fleni.org.ar"]
    };
    this.api.sendMail(this.postMail).subscribe(
      (data:any) =>{
      if(data){
        this.httpErrorMsg=data.msg;
        this.httpErrorType=1;
      } else {
        this.httpErrorMsg = data.msg;
        this.httpErrorType=data.status;
      }
        this.loading=false;
    }, error =>{
        this.loading=false;
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
    })
  }

  goBack(){
    localStorage.clear();
    this.router.navigate(['check-in']);
  }

  cardValue: any = {
    options: []
  };

  selectOptions: Array<string> = [
    this.emailPaciente,
  ];

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [ ...event.data ];
  };

}