import { Component, Input, OnInit } from '@angular/core';
import { Team } from '../../model/team';
import { Game } from '../../model/game';
import { GamesServiceService } from '../../services/games-service.service';
import { TeamsServiceService } from '../../services/teams-service.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() team!: Team;
  @Input() trackedList: Team[] = [];

  gameList: Game[] = [];
  results: string[] = [];
  avgScored: number = 0;
  avgConceded: number = 0;

  constructor(private _gamesService: GamesServiceService, private _teamsService: TeamsServiceService) { }

  ngOnInit(): void {
    this._gamesService.getDates();
    this._gamesService.getGames(this.team).subscribe(res => {
      if (res.data != undefined) {
        this.gameList = res.data;
      }
      this.getResults();
    })
  }

  remove(toRemove: Team): void {
    let index = this.trackedList.indexOf(toRemove);
    this.trackedList.splice(index, 1);
  }

  getResults(): void {
    let teamPoints: number | undefined = 0;
    let rivalPoints: number | undefined = 0;
    let totalScoredPoints: number | undefined = 0;
    let totalConcededPoints: number | undefined = 0;
    for (let i = 0; i < this.gameList.length; i++) {
      if (this.gameList[i].home_team?.id != undefined) {
        if (this.gameList[i].home_team?.id == this.team.id) { //IF TEAM IS HOME
          teamPoints = this.gameList[i].home_team_score;
          totalScoredPoints = totalScoredPoints + teamPoints!;
          rivalPoints = this.gameList[i].visitor_team_score;
          totalConcededPoints = totalConcededPoints + rivalPoints!;
        } else {                                              //IF TEAM IS VISITOR
          teamPoints = this.gameList[i].visitor_team_score;
          totalScoredPoints = totalScoredPoints + teamPoints!;
          rivalPoints = this.gameList[i].home_team_score;
          totalConcededPoints = totalConcededPoints + rivalPoints!;
        }
        if (teamPoints != undefined && rivalPoints != undefined && teamPoints > rivalPoints) {
          this.results.push('W');
        } else if (teamPoints != undefined && rivalPoints != undefined && teamPoints < rivalPoints) {
          this.results.push('L');
        }
      }
    }
    this.avgScored = Math.round(totalScoredPoints / this.gameList.length); //AVERAGE POINTS CALCULATOR
    this.avgConceded = Math.round(totalConcededPoints / this.gameList.length);
  }

  storageTeams(): void{
    this._teamsService.storageTeams(this.trackedList);
    this._teamsService.storageTrackedTeam(this.team);
  }

}
