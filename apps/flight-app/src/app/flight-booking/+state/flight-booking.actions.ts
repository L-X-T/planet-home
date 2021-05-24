import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const loadFlightBookings = createAction('[FlightBooking] Load FlightBookings', props<{ flights: Flight[] }>());

export const updateFlight = createAction('[FlightBooking] Update Flight', props<{ flight: Flight }>());
