import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./vistas/start/start.component";
import {FinishComponent} from "./vistas/finish/finish.component"

const routes: Routes = [
  { path: '', redirectTo:'validacion-receta', pathMatch: 'full'},
  { path: 'validacion-receta', component: StartComponent},
  { path: 'validacion-receta/:token', component: StartComponent },
  { path: 'validacion-receta-descargar', component: FinishComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//Buena practica: encapsular todas las rutas de las vistas en un solo componente
export const routingComponents = [StartComponent, FinishComponent]
