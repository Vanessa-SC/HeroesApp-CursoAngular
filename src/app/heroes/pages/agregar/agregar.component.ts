import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    private router: Router,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
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
        .subscribe(resp => this.mostrarSnackbar('Registro actualizado.')
        )
    } else {
      this.heroeServicio.agregarHeroe(this.heroe)
        .subscribe(resp => {
          this.router.navigate(['/heroes/editar', resp.id]);
          this.mostrarSnackbar('Registro creado');

        });
    }
  }

  borrar() {

    const dialog = this._dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroeServicio.borrarHeroe(this.heroe.id)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
              this.mostrarSnackbar('Registro eliminado');
            });
        }
      });


  }

  mostrarSnackbar(mensaje: string) {
    this._snackbar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }

}
