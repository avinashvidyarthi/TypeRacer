import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
import { CreateRaceComponent } from './create-race/create-race.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceComponent } from './race/race.component';
import { ErrorComponent } from './404/err.component';
import { FormsModule } from '@angular/forms';
import { RaceResultComponent } from './race-result/race-result.component';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    CreateRaceComponent,
    FooterComponent,
    RaceListComponent,
    RaceComponent,
    ErrorComponent,
    RaceResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
