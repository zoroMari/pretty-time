import { AfterViewInit, OnDestroy } from "@angular/core";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { ITime } from "../../ITime.model"
import { TimerService } from "../timer.service";

@Component({
  selector: 'app-timer-table',
  templateUrl: 'timer-table.component.html',
  styleUrls: ['timer-table.component.sass'],
})
export class TimerTableComponent implements OnInit, AfterViewInit, OnDestroy {
  public lastTimers: ITime[] = [];
  private _sub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['index', 'date', 'name', 'houres', 'minutes', 'seconds'];
  dataSource = new MatTableDataSource<ITime>();

  constructor(
    private _timerService: TimerService,
  ) {}

  public ngOnInit(): void {
    this.dataSource.data = this._timerService.lastTimers.reverse();

    this._sub = this._timerService.lastTimersChange.subscribe(
      (lastTimers: ITime[]) => {
        this.dataSource.data = lastTimers.reverse();
      }
    )

    this.lastTimers = this._timerService.lastTimers;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
      this._sub.unsubscribe();
  }
}
