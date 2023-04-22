import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/model/team';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input() team!: Team;
  @Input() trackedList: Team[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  remove(toRemove: Team) {
    let index = this.trackedList.indexOf(toRemove)  
    this.trackedList.splice(index, 1);}
}
