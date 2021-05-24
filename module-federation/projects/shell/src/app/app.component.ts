import { Component } from '@angular/core';
import { AuthLibService } from 'auth-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shell';

  constructor(private authLibService: AuthLibService) {
    this.authLibService.login('Javier', null);
  }
}
