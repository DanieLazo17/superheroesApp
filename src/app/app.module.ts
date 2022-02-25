import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { PersonajeEncontradoComponent } from './componentes/personaje-encontrado/personaje-encontrado.component';
import { MiPersonajeComponent } from './componentes/mi-personaje/mi-personaje.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { OrdenarEstadisticasPipe } from './transformaciones/ordenar-estadisticas.pipe';
import { ClasificarOrientacionPipe } from './transformaciones/clasificar-orientacion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    PersonajeEncontradoComponent,
    MiPersonajeComponent,
    NoEncontradoComponent,
    OrdenarEstadisticasPipe,
    ClasificarOrientacionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
