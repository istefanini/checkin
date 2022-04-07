import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})

export class FinishComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  linkReceta:any=localStorage.getItem('receta');
  beneficiario: any = localStorage.getItem('beneficiario');

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.linkReceta);
    // link.setAttribute('download', `receta.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
