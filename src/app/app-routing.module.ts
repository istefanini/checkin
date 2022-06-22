import { MaslGuard } from './masl.guard';
import { LoginComponent } from './vistas/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./vistas/start/start.component";
import {FinishComponent} from "./vistas/finish/finish.component";

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full'},
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'check-in', component: StartComponent, canActivate: [MaslGuard]},
  { path: 'check-in-formulario', component: FinishComponent, canActivate: [MaslGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//Buena practica: encapsular todas las rutas de las vistas en un solo componente
export const routingComponents = [StartComponent, FinishComponent]
