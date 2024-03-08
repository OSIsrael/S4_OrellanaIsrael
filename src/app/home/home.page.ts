import { Component } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { PokeApiService } from '../poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemonInput: string = '';
  pokemonTypes: string[] = [];
  pokemonImageUrl: string = '';

  constructor(private pokeApiService: PokeApiService, private db: Firestore) {}

  async searchPokemon() {
    if (this.pokemonInput) {
      try {
        const data = await this.pokeApiService.getPokemonByNameOrId(this.pokemonInput).toPromise();
        console.log(data);

        this.pokemonTypes = data.types.map((type: any) => type.type.name);
        this.pokemonImageUrl = data.sprites.front_default;

       
        if (this.pokemonTypes.length > 0) {
          const tipoRef = doc(this.db, 'pokemon', 'tipo'); 

          
          await setDoc(tipoRef, { tipo: this.pokemonTypes[0] });

          console.log('Tipo del Pokémon actualizado en Firestore correctamente.');
        }
      } catch (error) {
        console.error('Error searching Pokemon:', error);
      }
    }
  }
}
