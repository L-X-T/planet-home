import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { Flight } from '@flight-workspace/flight-lib';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit {
  control: FormControl;
  flights$: Observable<Flight[]>;
  loading: boolean;

  online = false;
  online$: Observable<boolean>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.control = new FormControl();
    const input$ = this.control.valueChanges.pipe(
      debounceTime(300),
      // filter((input) => input.length > 2),
      distinctUntilChanged((x, y) => x === y)
    );

    this.online$ = interval(2000).pipe(
      startWith(0),
      map((_) => Math.random() < 0.5),
      distinctUntilChanged(),
      tap((value) => (this.online = value))
    );

    this.flights$ = combineLatest([input$, this.online$]).pipe(
      filter(([_, online]) => online),
      map(([input, _]) => input),
      tap((input) => (this.loading = true)),
      switchMap((input) => this.load(input)),
      tap((v) => (this.loading = false))
    );

    /*this.flights$ = this.control.valueChanges.pipe(
      debounceTime(300),
      // filter((input) => input.length > 2),
      distinctUntilChanged(),
      tap((input) => (this.loading = true)),
      switchMap((input) => this.load(input)),
      tap((v) => (this.loading = false))
    );*/
  }

  load(from: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams().set('from', from);

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers });
  }
}
