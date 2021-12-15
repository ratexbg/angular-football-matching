import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 11, name: 'Dr Nice', rating: 1200, role: 'RW'},
      { id: 12, name: 'Narco', rating: 1200, role: 'RW'},
      { id: 13, name: 'Bombasto', rating: 1200, role: 'RW'},
      { id: 14, name: 'Celeritas', rating: 1200, role: 'RW'},
      { id: 15, name: 'Magneta', rating: 1200, role: 'RW'},
      { id: 16, name: 'RubberMan', rating: 1200, role: 'RW'},
      { id: 17, name: 'Dynama', rating: 1200, role: 'RW'},
      { id: 18, name: 'Dr IQ', rating: 1200, role: 'RW'},
      { id: 19, name: 'Magma', rating: 1200, role: 'RW'},
      { id: 20, name: 'Tornado', rating: 1200, role: 'RW'},
    ];
    return {players};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(players: Player[]): number {
    return players.length > 0 ? Math.max(...players.map(player => player.id)) + 1 : 11;
  }
}