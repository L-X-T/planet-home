import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { FlightService } from '@flight-workspace/flight-lib';

import { loadFlights, loadFlightBookings } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFlights),
      switchMap((a) => this.flightService.find(a.from, a.to, a.urgent)),
      map((flights) => loadFlightBookings({ flights }))
    )
  );

  constructor(private actions$: Actions, private flightService: FlightService) {}
}
