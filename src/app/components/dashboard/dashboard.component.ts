import { Component, OnInit } from '@angular/core';
import { TeamResponse } from 'src/app/model/team-response';
import { Team } from 'src/app/model/team';
import { TeamsServiceService } from 'src/app/services/teams-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teamList: Team[] = []
  trackedTeams: Team[] = []
  selectedTeam!: Team

  duplicated: boolean = false;
  added: boolean = false;

  constructor(private _teamsService: TeamsServiceService) { }

  ngOnInit(): void {
    this._teamsService.getTeams().subscribe((res: TeamResponse) => {
      if (res.data != undefined) {
        this.teamList = res.data;
      }
    })
  }

  changeSelectedTeam(data: Team) {
    this.selectedTeam = data;
  }

  track() {
    let teamExists = this.trackedTeams.some((e: Team) => (e.full_name === this.selectedTeam.full_name))
    if (this.selectedTeam != undefined) {
      if (teamExists) {
        this.duplicated = true;
        this.added = false;
      } else {
        this.duplicated = false;
        this.added = true;
        this.trackedTeams.push(this.selectedTeam)
      }
    }
  }


}
