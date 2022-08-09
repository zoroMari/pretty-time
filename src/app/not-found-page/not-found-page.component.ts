import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.sass'],
})
export class NotFoundPageComponent {

  constructor(private _router: Router) {}

  public handleNavigate(route: string) {
    this._router.navigate([route]);
  }
}
