import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiService } from "../../servicios/api/api.service";
import { SendMailInterface } from "../../modelos/sendMail.interface";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  constructor(private api:ApiService){ }

  ngOnInit(): void {
  }

  loading:boolean=false;
  linkEstudios:any=localStorage.getItem('estudios');
  beneficiario: any = localStorage.getItem('beneficiario');
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
    // link.setAttribute('download', `estudios.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  sendMail(){
    this.postMail={
      "pacienteId": "351066",
      "accession": "9275000831455",
      "emails" : ["istefanini@fleni.org.ar","stefanini.ignacio@gmail.com"]
  };
    console.log(this.postMail);
    this.api.sendMail(this.postMail).subscribe(
      (data:any) =>{
      if(data){
        console.log(data);
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

  cardValue: any = {
    options: []
  };

  selectOptions: Array<string> = [
    'stefanini.ignacio@gmail.com', 'istefanini@fleni.org', 'leovillar@gmail.com', 'lvillar@fleni.org', 'nachostefanini@yahoo.com'
  ];

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [ ...event.data ];
  };
}
