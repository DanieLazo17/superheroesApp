import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {  
  usuario!: Usuario;
  mensaje!: string;

  constructor(private ruteo: Router, private api: ApiService, private user: UserService) {    
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  formRegistro = new FormGroup({
    email: new FormControl('', [Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/), Validators.required]),
    password: new FormControl('', Validators.required)
  });
  
  enviar(): void {
    let datos = new FormData();    
    datos.append("email", this.formRegistro.get('email')!.value);
    datos.append("password", this.formRegistro.get('password')!.value);
    this.api.registrar(datos).subscribe(
      respuesta => { this.permitirAcceso(respuesta) },
      (error: HttpErrorResponse) => { this.denegarAcceso(error) },
    );
  }

  permitirAcceso(respuesta: any): void {
    this.mensaje = "";
    localStorage.setItem("token", respuesta.token);
    this.user.MiToken = respuesta.token;
    this.user.MiEmail = this.formRegistro.get('email')!.value;
    this.ruteo.navigate(['/home']);
  }

  denegarAcceso(error: HttpErrorResponse): void {
    this.formRegistro.reset();    
    this.mensaje = error.error.error;
  }

  get email(){ return this.formRegistro.get('email')!; }
  get password(){ return this.formRegistro.get('password')!; }
}