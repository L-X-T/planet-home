import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  value1 = true;

  changed(event: Event): void {
    // eslint-disable-next-line no-restricted-syntax
    console.debug('event', event);
    this.value1 = event['detail'];
  }
}
