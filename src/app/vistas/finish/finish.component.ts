import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { SendMailInterface } from "../../modelos/sendMail.interface";
import { ClipboardModule } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  constructor(private api:ApiService){ }

  ngOnInit(): void {
    this.cardValue[0]=this.emailPaciente;
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

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.linkEstudios);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  sendMail(){
    this.postMail={
      "pacienteId": this.pacienteId,
      "accession": this.accession,
      "emails" : ["istefanini@fleni.org.ar","stefanini.ignacio@gmail.com"]
    };
    this.api.sendMail(this.postMail).subscribe(
      (data:any) =>{
      if(data){
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
