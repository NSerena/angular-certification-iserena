import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/game';
import { Result } from '../../model/result';
import { Team } from '../../model/team';
import { GamesServiceService } from '../../services/games-service.service';
import { TeamsServiceService } from '../../services/teams-service.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  team: Team;
  gameList: Game[] = [];

  resultList: Result[] = [];

  teamPoints: number | undefined = 0;
  rivalPoints: number | undefined = 0;

  constructor(private _gamesService: GamesServiceService, private _teamsService: TeamsServiceService) {
    this.team = this._teamsService.getStoragedTrackedTeam();
  }

  ngOnInit(): void {
    this._gamesService.getDates();
    this._gamesService.getGames(this.team).subscribe(res => {
      if (res.data != undefined) {
        this.gameList = res.data;
      }
      this.getResults();
    })
  }

  getResults() {
    for (let i = 0; i < this.gameList.length; i++) {
      if (this.gameList[i].home_team?.id != undefined) {
        if (this.gameList[i].home_team?.id == this.team.id) { //IF TEAM IS HOME
          this.teamPoints = this.gameList[i].home_team_score;
          this.rivalPoints = this.gameList[i].visitor_team_score;
          this.resultList.push({
            home_team: this.gameList[i].home_team?.abbreviation,
            home_team_score: this.teamPoints,
            visitor_team: this.gameList[i].visitor_team?.abbreviation,
            visitor_team_score: this.rivalPoints
          })
        } else {                                              //IF TEAM IS VISITOR
          this.teamPoints = this.gameList[i].visitor_team_score;
          this.rivalPoints = this.gameList[i].home_team_score;
          this.resultList.push({
            home_team: this.gameList[i].home_team?.abbreviation,
            home_team_score: this.rivalPoints,
            visitor_team: this.gameList[i].visitor_team?.abbreviation,
            visitor_team_score: this.teamPoints
          })
        }
      }
    }
  }
}
