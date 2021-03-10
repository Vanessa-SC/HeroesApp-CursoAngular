import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 70%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private _activatedRoute: ActivatedRoute, 
    private _heroeService: HeroesService,
    private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap( (param) => this._heroeService.getHeroePorId( param.id ) )
      )
      .subscribe( resp => this.heroe = resp);
  }

  regresar(){
    this._router.navigate(['/heroes/listado']);
  }

}
