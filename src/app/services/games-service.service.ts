import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameResponse } from '../model/game-response';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class GamesServiceService {

  private baseUrl: string = 'https://free-nba.p.rapidapi.com';

  headers = new HttpHeaders()
    .set('X-RapidAPI-Key', '8517a80e24mshb56fb3e850506a2p113d9bjsn6e88de3085b3')
    .set('X-RapidAPI-Host', 'free-nba.p.rapidapi.com');

  dates: string[] = [];


  params = new HttpParams()
    .set('per_page', 12)

  getDates(): void {
    this.dates = []
    let today: Date = new Date
    for (let i = 0; i < 12; i++) {
      let str: string = today.toISOString().split('T')[0];
      let newStr: string = str.replace(/[\/]/g, '-');
      this.dates.push(newStr);
      today.setDate(today.getDate() - 1);
    }

    for (let i = 0; i < this.dates.length; i++) {
      this.params = this.params.append('dates[]', this.dates[i]);
    }
  }

  constructor(private _httpClient: HttpClient) { }

  getGames(input: Team): Observable<GameResponse> {
    return this._httpClient.get<GameResponse>(`${this.baseUrl}/games?team_ids[]=${input.id}`, { 'headers': this.headers, 'params': this.params });
  }
}
