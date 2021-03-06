import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
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

  startForm = new FormGroup({
    accesoId: new FormControl('', Validators.required),
  })
  httpErrorMsg:any="";
  httpErrorType:number=0;
  loading:boolean=false;
  checkinSites: any;

  sitesForm= this.formBuilder.group({
    accesoId: ['', Validators.required],
  })

  constructor(private api:ApiService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private snackbar: MatSnackBar){ }

  ngOnInit(): void {
    this.api.getCheckinSites().subscribe(
      (data:any) =>{
        this.checkinSites=data;
      }, error =>{
        this.httpErrorMsg=this.api.httpErrorMsg;
        this.httpErrorType=this.api.httpErrorType;
        this.loading=false;
      });
  }

  saveCheckinSite(){
    localStorage.setItem("siteId", this.sitesForm.value.accesoId.siteId);
    localStorage.setItem("siteName", this.sitesForm.value.accesoId.name);
    this.openSnackbar('Sitio guardado exitosamente', '', 5000, 'success-snackbar');
    this.router.navigate(['check-in-formulario']);
  }

  openSnackbar(message: string, action: string, duration: number, color: string): void{
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [color]
    });
  }

  // removeCheckinSite(){
  //   localStorage.clear();
  // }

}