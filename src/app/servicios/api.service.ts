import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

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
    return this.clienteHttp.post(this.apiRegistro, datos)
    .pipe(
      catchError(this.handleError)
    );
  }

  buscarPersonajePorNombre(name: string){
    return this.clienteHttp.get(this.apiSuperHero + this.accessToken + '/search/' + name)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(error);
  }
}
