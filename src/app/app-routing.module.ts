import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivadorGuard } from './autorizaciones/activador.guard';
import { HomeComponent } from './componentes/home/home.component';
import { MiPersonajeComponent } from './componentes/mi-personaje/mi-personaje.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path:'', component:RegistroComponent},
  {path:'home', component:HomeComponent, canActivate:[ActivadorGuard]},  
  {path:'**', component:NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
