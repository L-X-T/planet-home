import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-lib';

export const flightBookingFeatureKey = 'flightBooking';

export interface State {
  flights: Flight[];
}

export interface FlightBookingAppState {
  flightBooking: State;
}

export const initialState: State = {
  flights: []
};

export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.loadFlightBookings, (state, action) => {
    const flights = action.flights;
    return { ...state, flights };
  })
);
