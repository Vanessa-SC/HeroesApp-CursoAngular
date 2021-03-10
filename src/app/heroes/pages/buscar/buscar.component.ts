import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe  | undefined;

  constructor( private heroeServicio: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroeServicio.getSugerencias(this.termino.trim()).subscribe(
      resp => this.heroes = resp
    );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent){

    if(!event.option.value) {
      this.heroeServicio = undefined;
      return;
    }
      const heroe:Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroeServicio.getHeroePorId(heroe.id)
        .subscribe(resp => this.heroeSeleccionado=resp);    

  }

}
