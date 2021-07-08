import { createSelector } from '@ngrx/store';
import { FlightBookingAppState } from './flight-booking.reducer';

export const selectFlights = (s: FlightBookingAppState) => s.flightBooking.flights;
export const negativeList = (s: FlightBookingAppState) => s.flightBooking.negativeList;

export const selectFlightBookingState = createSelector(selectFlights, negativeList, (flights, negativeList) =>
  flights.filter((f) => !negativeList.includes(f.id))
);
