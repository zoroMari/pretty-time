import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";
import { TimerComponent } from "./timer/timer.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { WorldClockComponent } from "./world-clock/world-clock.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent, data: {title: 'Welcome to PrettyTime'}},
  {path: 'world-clock', component: WorldClockComponent, data: {title: 'World Clock'}},
  {path: 'timer', component: TimerComponent, data: {title: 'Timer'}},
  {path: 'stopwatch', component: StopwatchComponent, data: {title: 'Stopwatch'}},
  {path: '**', redirectTo: ''},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {

}
