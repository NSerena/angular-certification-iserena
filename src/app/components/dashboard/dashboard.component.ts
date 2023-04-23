import { Component, OnInit } from '@angular/core';
import { TeamResponse } from '../../model/team-response';
import { Team } from '../../model/team';
import { TeamsServiceService } from '../../services/teams-service.service';
import { GamesServiceService } from '../../services/games-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teamList: Team[] = [];
  storagedTeams: Team[] = [];
  trackedTeams: Team[] = this.storagedTeams;
  selectedTeam!: Team;

  constructor(private _teamsService: TeamsServiceService, private _gamesService: GamesServiceService) { }

  ngOnInit(): void {
    this._teamsService.getTeams().subscribe((res: TeamResponse) => {
      if (res.data != undefined) {
        this.teamList = res.data;
      }
    })
    this.storagedTeams = this._teamsService.getStoragedTeams()
    if(this.storagedTeams!= undefined){
      this.storagedTeams.forEach(id => {
        this.trackedTeams.push(id);
      });
    }
  }

  changeSelectedTeam(data: Team) {
    this.selectedTeam = data;
  }

  track() {
    let teamExists = this.trackedTeams.some((e: Team) => (e.full_name === this.selectedTeam.full_name))
    if (this.selectedTeam != undefined) {
      if (!teamExists) {
        this.trackedTeams.push(this.selectedTeam);
      }
    }
  }


}
