import { Component, ComponentFactoryResolver, Inject, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthLibService } from 'auth-lib';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html'
})
export class FlightsSearchComponent {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  user = this.authLibService.user;

  constructor(private authLibService: AuthLibService, @Inject(Injector) private injector, @Inject(ComponentFactoryResolver) private cfr) {}

  search(): void {
    alert('Not implemented for this demo!');
  }

  terms(): void {
    import('../lazy/lazy.component')
      .then((m) => m.LazyComponent)
      .then((comp) => {
        const factory = this.cfr.resolveComponentFactory(comp);
        this.viewContainer.createComponent(factory, null, this.injector);
      });
  }
}
