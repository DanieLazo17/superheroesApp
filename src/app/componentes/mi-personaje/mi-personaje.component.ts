import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from 'src/app/entidades/character';

@Component({
  selector: 'app-mi-personaje',
  templateUrl: './mi-personaje.component.html',
  styleUrls: ['./mi-personaje.component.css']
})
export class MiPersonajeComponent implements OnInit {
  @Input() miPersonaje!:Character;
  @Output() eliminarMiPersonaje = new EventEmitter<Character>();
  @Output() verMiPersonaje = new EventEmitter<Character>();

  constructor() { }

  ngOnInit(): void {
  }

  mostrarDetallePersonaje():void{
    this.verMiPersonaje.emit(this.miPersonaje);
  }

  eliminarPersonaje():void{
    this.eliminarMiPersonaje.emit(this.miPersonaje);
  }
}
