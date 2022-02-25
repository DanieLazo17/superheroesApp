import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../entidades/character';

@Pipe({
  name: 'clasificarOrientacion'
})
export class ClasificarOrientacionPipe implements PipeTransform {

  transform(value: Array<Character>, ...args: number[]): Array<Character> {    
    switch (args[0]) {
      case 1:        
        return value.filter( (miPersonaje: Character) => {
          return miPersonaje.biography.alignment.valueOf() == "good" || miPersonaje.biography.alignment.valueOf() == "neutral";
        });
      case 2:
        return value.filter( (miPersonaje: Character) => {
          return miPersonaje.biography.alignment.valueOf() == "bad";
        });          
      default:
        return value;
    }    
  }

}
