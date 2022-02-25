import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private email !: string;
  
  public get MiEmail() : string {
    return this.email;
  }
  public set MiEmail(v : string) {
    this.email = v;
  }

  private token !: string;
  
  public get MiToken() : string {
    return this.token;
  }
  public set MiToken(v : string) {
    this.token = v;
  }

  constructor() { }
}
