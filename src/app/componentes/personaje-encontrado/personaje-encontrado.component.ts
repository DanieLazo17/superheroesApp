import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/entidades/character';
import { ApiService } from 'src/app/servicios/api.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-personaje-encontrado',
  templateUrl: './personaje-encontrado.component.html',
  styleUrls: ['./personaje-encontrado.component.css']
})
export class PersonajeEncontradoComponent implements OnInit {
  @Input() personaje!:Character;
  @Output() agregarPersonaje = new EventEmitter<Character>();

  constructor(private ruteo: Router, private api: ApiService, public user: UserService) {

  }

  ngOnInit(): void {
  }

  agregar():void{
    this.agregarPersonaje.emit(this.personaje);
  }
}
