import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResultsComponent } from './components/results/results.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResultsComponent,
    TeamCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
