import { ExtraOptions, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module').then((m) => m.FlightBookingModule)
  },
  {
    path: 'flight-lookahead',
    component: FlightLookaheadComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const APP_EXTRA_OPTIONS: ExtraOptions = { relativeLinkResolution: 'legacy' };
