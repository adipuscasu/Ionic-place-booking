import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();

  public loadedPlaces: Array<Place>;
  public loadedListPlaces: Array<Place>;

  constructor(
    private readonly _placesService: PlacesService,
    private readonly _menuController: MenuController
  ) {}
  trackByFn(index, item) {
    return item ? item.id : index;
  }
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscribeToPlaces();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(typeof event);
    console.log('event: ', event.detail);
  }
  private subscribeToPlaces() {
    const offersSubscription = this._placesService.places$.subscribe(
      (places) => {
        this.loadedPlaces = places;
        this.loadedListPlaces = this.loadedPlaces;
      }
    );
    this._subscription.add(offersSubscription);
  }
}
