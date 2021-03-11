import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
    characters: ''
  }
  constructor(
    private heroeServicio: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
      return;
    }
    

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeServicio.getHeroePorId(id))
      )
      .subscribe(resp => this.heroe = resp);
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) { return; }

    if (this.heroe.id) {
      this.heroeServicio.actualizarHeroe(this.heroe)
        .subscribe(resp => console.log('Actualizando ', resp)
        )
    } else {
      this.heroeServicio.agregarHeroe(this.heroe)
        .subscribe(resp => {
          this.router.navigate(['/heroes/editar',resp.id])
        });
    }
  }

  borrar(){
    this.heroeServicio.borrarHeroe(this.heroe.id)
      .subscribe( resp => {
        this.router.navigate(['/heroes']);
      });
  }

}
