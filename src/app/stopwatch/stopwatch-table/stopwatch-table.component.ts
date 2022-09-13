import { Component, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { ITime } from "src/app/ITime.model";
import { StopwatchService } from "../stopwatch.service";

@Component({
  selector: 'app-stopwatch-table',
  templateUrl: 'stopwatch-table.component.html',
  styleUrls: ['stopwatch-table.component.sass'],
})
export class StopwatchTableComponent {
  private _sub: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'index', 'date', 'name', 'houres', 'minutes', 'seconds'
  ];

  constructor(private _stopwatchService: StopwatchService) {}

  public dataSource = new MatTableDataSource<ITime>();

  public ngOnInit(): void {
    this.dataSource.data = this._stopwatchService.lastStopwatches;

    this._sub = this._stopwatchService.lastStopwatchesChanges.subscribe(
      (lastStopwatches: ITime[]) => {
        this.dataSource.data = lastStopwatches;
      }
    )

    // this.lastStopwatches = this._stopwatchService.lastStopwatches;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
