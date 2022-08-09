import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { WorldClockComponent } from './world-clock/world-clock.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { TitleComponent } from './shared/title/title.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TimerComponent,
    StopwatchComponent,
    WorldClockComponent,
    WelcomeComponent,
    TitleComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
