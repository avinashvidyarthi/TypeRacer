import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRaceComponent } from './create-race/create-race.component';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceComponent } from './race/race.component';
import { ErrorComponent } from './404/err.component';
import { RaceResultComponent } from './race-result/race-result.component';

const routes: Routes = [
  { path: 'create-race', component: CreateRaceComponent },
  { path: '', component: RaceListComponent },
  { path: 'race/:race_id', component: RaceComponent },
  { path: 'race-result/:race_id', component: RaceResultComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
