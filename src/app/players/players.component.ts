import { Component, OnInit } from '@angular/core';
import { Player } from '../player';                             // importirane
//import { HEROES } from '../mock-playeres';
import { PlayerService } from '../player.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPlayers();
  }


  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players);

  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.addPlayer({ name } as Player)
      .subscribe(player => {
        this.players.push(player);
      });
  }


  delete(player: Player): void {
    this.players = this.players.filter(p => p !== player);
    this.playerService.deletePlayer(player.id).subscribe();
  }


}