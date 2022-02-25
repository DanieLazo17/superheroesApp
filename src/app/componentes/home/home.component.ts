import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from 'src/app/entidades/character';
import { Powerstats } from 'src/app/entidades/powerstats';
import { Team } from 'src/app/entidades/team';
import { ApiService } from 'src/app/servicios/api.service';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  personajesEncontrados!:Array<Character>;
  misPersonajes!:Array<Character>;
  personajeModal!:Character;
  habilitaModal!:boolean;
  habilitaModalDeAlerta!:boolean;
  tituloModalDeAlerta!:string;
  contenidoModalDeAlerta!:string;
  habilitaResumenEquipo!:boolean;
  miEquipo!:Team;
  estadisticasDelEquipo!:Array<any>;
  goodCharacters!:Array<Character>;
  badCharacters!:Array<Character>;  

  constructor(private ruteo: Router, private api: ApiService, public user: UserService) { 
    this.misPersonajes = new Array();
    this.habilitaModal = false;
    this.habilitaModalDeAlerta = false;
    this.miEquipo = new Team();
    this.goodCharacters = new Array();
    this.badCharacters = new Array();
    this.personajesEncontrados = new Array();
  }

  ngOnInit(): void {
  }

  salir():void{
    sessionStorage.removeItem("token");
    this.user.MiToken = "";
    this.user.MiEmail = "";
    this.ruteo.navigate([""]);
  }

  formBusqueda = new FormGroup({
    nombre: new FormControl('', [Validators.minLength(2), Validators.required])
  });

  get nombre(){ return this.formBusqueda.get('nombre')!; }

  buscarPorNombre(){    
    this.api.buscarPersonajePorNombre(this.formBusqueda.get('nombre')!.value).subscribe(
      respuesta => { this.mostrarPersonajesEncontrados(respuesta) }            
    )    
  }

  mostrarPersonajesEncontrados(respuesta: any):void{
    if (respuesta.response == "error") {      
      this.formBusqueda.reset();
      this.tituloModalDeAlerta = respuesta.error;
      this.contenidoModalDeAlerta = "You need a facebook account to get your access token";
      let boton = (<HTMLButtonElement>document.getElementById('btnBuscar'));

      if (!boton.hasAttribute("data-bs-toggle")) {
        boton.setAttribute("data-bs-toggle", "modal");
        boton.setAttribute("data-bs-target", "#staticBackdrop");
        boton.click();
      }      
      this.habilitaModalDeAlerta = true;
    }

    if (respuesta.response == "success") {
      this.personajesEncontrados = <Array<Character>>respuesta.results;
      setTimeout(() => {
        window.scrollTo(0, (<HTMLDivElement>document.getElementById('miEquipoId')).scrollHeight);
      }, 500);
    }
  }

  sumarPersonajeAlEquipo(nuevoPersonaje: Character):void{
    let longitud = this.misPersonajes.length;

    switch (longitud) {
      case 0:
        this.agregarPersonaje(nuevoPersonaje);
        this.habilitaResumenEquipo = true;
        break;

      case 1:
      case 2:
        if (this.buscarIDPersonaje(this.misPersonajes, nuevoPersonaje.id) == -1) {
          this.agregarPersonaje(nuevoPersonaje);
        } else {
          this.tituloModalDeAlerta = "No puede agregar este personaje...";
          this.contenidoModalDeAlerta = nuevoPersonaje.name + " ya es un miembro del equipo";
        }        
        break;

      case 3:
      case 4:
      case 5:
        if (this.buscarIDPersonaje(this.misPersonajes, nuevoPersonaje.id) == -1) {

          if (nuevoPersonaje.biography.alignment.valueOf() == "good" || nuevoPersonaje.biography.alignment.valueOf() == "neutral"){
            if (this.miEquipo.goodAlignment < 3) {                    
              this.agregarPersonaje(nuevoPersonaje);
            } else {
              this.tituloModalDeAlerta = "No puede agregar este personaje...";
              this.contenidoModalDeAlerta = "Solo se permiten 3 personajes con orientación buena";
            }
          }
    
          if (nuevoPersonaje.biography.alignment.valueOf() == "bad"){
            if (this.miEquipo.badAlignment < 3) {
              this.agregarPersonaje(nuevoPersonaje);
            } else {
              this.tituloModalDeAlerta = "No puede agregar este personaje...";
              this.contenidoModalDeAlerta = "Solo se permiten 3 personajes con orientación mala";
            }
          }

        } else {
          this.tituloModalDeAlerta = "No puede agregar este personaje...";
          this.contenidoModalDeAlerta = nuevoPersonaje.name + " ya es un miembro del equipo";
        }        
        break;
      
      case 6:
        this.tituloModalDeAlerta = "No puede agregar más personajes...";
        this.contenidoModalDeAlerta = "Solo se permiten 6 personajes por equipo";
        break;
      default:
        break;
    }
    
    this.habilitaModalDeAlerta = true;
    this.personajesEncontrados.splice(0, this.personajesEncontrados.length);
  }

  agregarPersonaje(personaje: Character): void {
    this.misPersonajes.push(personaje);
    this.incrementarAtributosDeEquipo(personaje);
    this.clasificarPersonajeBuenoMalo(personaje);
    this.tituloModalDeAlerta = "Personaje agregado...";
    this.contenidoModalDeAlerta = personaje.name;
  }

  clasificarPersonajeBuenoMalo(personaje: Character):void{
    if(personaje.biography.alignment.valueOf() == "good" || personaje.biography.alignment.valueOf() == "neutral"){
      this.goodCharacters.push(personaje);
    }
    if(personaje.biography.alignment.valueOf() == "bad"){
      this.badCharacters.push(personaje);
    }
  }

  eliminarPersonajeBuenoMalo(id: string):void{
    let indiceGoodCharacters = this.buscarIDPersonaje(this.goodCharacters, id);
    let indiceBadCharacters = this.buscarIDPersonaje(this.badCharacters, id);

    if (indiceGoodCharacters != -1) {
      this.goodCharacters.splice(indiceGoodCharacters, 1);
    }
    if (indiceBadCharacters != -1) {
      this.badCharacters.splice(indiceBadCharacters, 1);
    }
  }

  incrementarAtributosDeEquipo(personaje: Character):void{
    this.miEquipo.powerstats.intelligence = (Number(this.miEquipo.powerstats.intelligence) + Number((personaje.powerstats.intelligence == "null") ? "0" : personaje.powerstats.intelligence)).toString();
    this.miEquipo.powerstats.strength = (Number(this.miEquipo.powerstats.strength) + Number((personaje.powerstats.strength == "null") ? "0" : personaje.powerstats.strength)).toString();
    this.miEquipo.powerstats.speed = (Number(this.miEquipo.powerstats.speed) + Number((personaje.powerstats.speed == "null") ? "0" : personaje.powerstats.speed)).toString();
    this.miEquipo.powerstats.durability = (Number(this.miEquipo.powerstats.durability) + Number((personaje.powerstats.durability == "null") ? "0" : personaje.powerstats.durability)).toString();
    this.miEquipo.powerstats.power = (Number(this.miEquipo.powerstats.power) + Number((personaje.powerstats.power == "null") ? "0" : personaje.powerstats.power)).toString();
    this.miEquipo.powerstats.combat = (Number(this.miEquipo.powerstats.combat) + Number((personaje.powerstats.combat == "null") ? "0" : personaje.powerstats.combat)).toString();
    
    let alturaPersonaje = personaje.appearance.height[1].split(" ");
    this.miEquipo.height = this.miEquipo.height + Number(alturaPersonaje[0]);
    this.miEquipo.averageHeight = this.miEquipo.height / this.misPersonajes.length;

    let pesoPersonaje = personaje.appearance.weight[1].split(" ");
    this.miEquipo.weight = this.miEquipo.weight + Number(pesoPersonaje[0]);
    this.miEquipo.averageWeight = this.miEquipo.weight /this.misPersonajes.length;

    if (personaje.biography.alignment.valueOf() == "good" || personaje.biography.alignment.valueOf() == "neutral") {
      this.miEquipo.goodAlignment = this.miEquipo.goodAlignment + 1;
    }

    if (personaje.biography.alignment.valueOf() == "bad") {
      this.miEquipo.badAlignment = this.miEquipo.badAlignment + 1;
    }

    this.estadisticasDelEquipo = Object.entries(this.miEquipo.powerstats);
  }

  decrementarAtributosDeEquipo(personaje: Character):void{
    this.miEquipo.powerstats.intelligence = (Number(this.miEquipo.powerstats.intelligence) - Number((personaje.powerstats.intelligence == "null") ? "0" : personaje.powerstats.intelligence)).toString();
    this.miEquipo.powerstats.strength = (Number(this.miEquipo.powerstats.strength) - Number((personaje.powerstats.strength == "null") ? "0" : personaje.powerstats.strength)).toString();
    this.miEquipo.powerstats.speed = (Number(this.miEquipo.powerstats.speed) - Number((personaje.powerstats.speed == "null") ? "0" : personaje.powerstats.speed)).toString();
    this.miEquipo.powerstats.durability = (Number(this.miEquipo.powerstats.durability) - Number((personaje.powerstats.durability == "null") ? "0" : personaje.powerstats.durability)).toString();
    this.miEquipo.powerstats.power = (Number(this.miEquipo.powerstats.power) - Number((personaje.powerstats.power == "null") ? "0" : personaje.powerstats.power)).toString();
    this.miEquipo.powerstats.combat = (Number(this.miEquipo.powerstats.combat) - Number((personaje.powerstats.combat == "null") ? "0" : personaje.powerstats.combat)).toString();
    
    let alturaPersonaje = personaje.appearance.height[1].split(" ");
    this.miEquipo.height = this.miEquipo.height - Number(alturaPersonaje[0]);    

    let pesoPersonaje = personaje.appearance.weight[1].split(" ");
    this.miEquipo.weight = this.miEquipo.weight - Number(pesoPersonaje[0]);
    
    if(this.misPersonajes.length == 0){
      this.miEquipo.averageHeight = 0.0;
      this.miEquipo.averageWeight = 0.0;
    } else {
      this.miEquipo.averageHeight = this.miEquipo.height / this.misPersonajes.length;
      this.miEquipo.averageWeight = this.miEquipo.weight /this.misPersonajes.length;
    }     

    if (personaje.biography.alignment.valueOf() == "good" || personaje.biography.alignment.valueOf() == "neutral") {
      this.miEquipo.goodAlignment = this.miEquipo.goodAlignment - 1;
    }

    if (personaje.biography.alignment.valueOf() == "bad") {
      this.miEquipo.badAlignment = this.miEquipo.badAlignment - 1;
    }

    this.estadisticasDelEquipo = Object.entries(this.miEquipo.powerstats);
  }

  /*
  calcularAtributosDeEquipo():void{
    this.miEquipo = new Team();
    let sumaAltura = 0.0;
    let sumaPeso = 0.0;
    this.misPersonajes.forEach(personaje => {
      this.miEquipo.powerstats.intelligence = (Number(this.miEquipo.powerstats.intelligence) + Number((personaje.powerstats.intelligence=="null")?"0":personaje.powerstats.intelligence)).toString();
      this.miEquipo.powerstats.strength = (Number(this.miEquipo.powerstats.strength) + Number((personaje.powerstats.strength=="null")?"0":personaje.powerstats.strength)).toString();
      this.miEquipo.powerstats.speed = (Number(this.miEquipo.powerstats.speed) + Number((personaje.powerstats.speed=="null")?"0":personaje.powerstats.speed)).toString();
      this.miEquipo.powerstats.durability = (Number(this.miEquipo.powerstats.durability) + Number((personaje.powerstats.durability=="null")?"0":personaje.powerstats.durability)).toString();
      this.miEquipo.powerstats.power = (Number(this.miEquipo.powerstats.power) + Number((personaje.powerstats.power=="null")?"0":personaje.powerstats.power)).toString();
      this.miEquipo.powerstats.combat = (Number(this.miEquipo.powerstats.combat) + Number((personaje.powerstats.combat=="null")?"0":personaje.powerstats.combat)).toString();

      let altura = personaje.appearance.height[1].split(" ");
      sumaAltura = sumaAltura + Number(altura[0]);

      let peso = personaje.appearance.weight[1].split(" ");
      sumaPeso = sumaPeso + Number(peso[0]);

      if(personaje.biography.alignment.valueOf() == "good" || personaje.biography.alignment.valueOf() == "neutral"){
        this.miEquipo.goodAlignment = this.miEquipo.goodAlignment + 1;
      }

      if(personaje.biography.alignment.valueOf() == "bad"){
        this.miEquipo.badAlignment = this.miEquipo.badAlignment + 1;
      }
    });

    if(this.misPersonajes.length > 0){
      this.miEquipo.height = sumaAltura / this.misPersonajes.length;
      this.miEquipo.weight = sumaPeso /this.misPersonajes.length;
    }

    this.estadisticasDelEquipo = Object.entries(this.miEquipo.powerstats);  
  }
  */

  eliminarPersonajeDeEquipo(personaje: Character):void{
    this.misPersonajes.splice(this.buscarIDPersonaje(this.misPersonajes, personaje.id),1);
    this.eliminarPersonajeBuenoMalo(personaje.id);

    this.decrementarAtributosDeEquipo(personaje);
  }

  buscarIDPersonaje(personajes: Array<Character>, id: string):number{
    let indiceEncontrado = personajes.findIndex((miPersonaje: Character)=>{
      return miPersonaje.id == id;
    });
    return indiceEncontrado;
  }

  verDetallePersonaje(miPersonaje: Character):void{
    this.personajeModal = miPersonaje;
    this.habilitaModal = true;    
  }
}