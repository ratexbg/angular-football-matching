import { Injectable } from '@angular/core';
import { Player } from './player';
//import { HEROES } from './mock-playeres';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }


  private playersUrl = 'api/players';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(tap(_ => this.log('fetched players')),catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }
  


  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;

    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  /** PUT: update the player on the server */
  updatePlayer(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }


  /** POST: add a new player to the server */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      tap((newPlayer: Player) => this.log(`added player w/ id=${newPlayer.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  searchPlayers(term: string): Observable<Player[]> {
    if (!term.trim()) {
      // if not search term, return empty player array.
      return of([]);
    }
    return this.http.get<Player[]>(`${this.playersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found players matching "${term}"`) :
         this.log(`no players matching "${term}"`)),
      catchError(this.handleError<Player[]>('searchPlayers', []))
    );
  }


  deletePlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
  
    return this.http.delete<Player>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }
  
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result  ;at param is used for documentation purposes.
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  


}


// get all ; get one; put; post