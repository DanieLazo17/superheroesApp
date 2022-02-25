import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRegistro:string;
  apiSuperHero:string;
  accessToken!:string;

  constructor(private clienteHttp: HttpClient) {
    this.apiRegistro = 'http://challenge-react.alkemy.org/';
    //this.apiSuperHero = 'https://superheroapi.com/api/';
    this.apiSuperHero = 'api/';
    this.accessToken = '2950056405295313'; 
  }

  registrar(datos:FormData):Observable<any>{
    return this.clienteHttp.post(this.apiRegistro, datos);
  }

  buscarPersonajePorNombre(name: string){
    return this.clienteHttp.get(this.apiSuperHero + this.accessToken + '/search/' + name);
  }
}
