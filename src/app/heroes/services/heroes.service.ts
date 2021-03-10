import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor( private _http: HttpClient ) { }

  getHeroes(){
    return this._http.get<Heroe[]>('http://localhost:3000/heroes');
  }

  getHeroePorId(id: string):Observable<Heroe>{
    return this._http.get<Heroe>('http://localhost:3000/heroes/'+id);
  }

}
