import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // console.log('this._route >>>', this._route);
    // console.log(' >>>', this._route.snapshot.data['title']);
    // this.title = this._route.snapshot.data['title'];

    // this._route.data.subscribe(
    //   (data) => {
    //     console.log('data >>>', data['title']);
    //     this.title = data['title'];
    //   }
    // )
  }
}
