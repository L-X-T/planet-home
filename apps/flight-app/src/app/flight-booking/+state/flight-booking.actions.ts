import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-lib';

export const loadFlightBookings = createAction('[FlightBooking] Load FlightBookings', props<{ flights: Flight[] }>());

export const loadFlights = createAction('[FlightBooking] Load Flights', props<{ from: string; to: string; urgent: boolean }>());

export const loadFlightsError = createAction('[FlightBooking] Load Flights Error');

export const updateFlight = createAction('[FlightBooking] Update Flight', props<{ flight: Flight }>());
