import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TeamResponse } from '../model/team-response';
import { Team } from '../model/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {

  storagedTeams!: Team[]; 
  storagedTrackedTeam!: Team;
  
  private baseUrl: string = 'https://free-nba.p.rapidapi.com';

  headers = new HttpHeaders()
    .set('X-RapidAPI-Key', '8517a80e24mshb56fb3e850506a2p113d9bjsn6e88de3085b3')
    .set('X-RapidAPI-Host', 'free-nba.p.rapidapi.com');

  params = new HttpParams().set('per_page', 45)


  constructor(private _httpClient: HttpClient) { }

  getTeams(): Observable<TeamResponse> {
    return this._httpClient.get<TeamResponse>(`${this.baseUrl}/teams`, { 'headers': this.headers, 'params': this.params });
  }

  getStoragedTeams(): Team[]{
    return this.storagedTeams;
  }

  storageTeams(input: Team[]): void {
    this.storagedTeams = input;
  }

  getStoragedTrackedTeam(): Team{
    return this.storagedTrackedTeam;
  }

  storageTrackedTeam(input: Team): void{
    this.storagedTrackedTeam = input;
  }

}
