import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemonByNameOrId(nameOrId: string): Observable<any> {
    const url = `${this.apiUrl}${nameOrId.toLowerCase()}`;
    return this.http.get(url);
  }
}
