import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  public relevantPlaces: Array<Place>;
  public loadedPlaces: Array<Place>;
  public listedLoadedPlaces: Array<Place>;

  private readonly _subscription = new Subscription();
  constructor(
    private readonly _placesService: PlacesService,
    private readonly _menuController: MenuController,
    private readonly _authService: AuthService
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
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter((p) => {
        return p.userId !== this._authService.userId;
      });
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }
  private subscribeToPlaces() {
    const offersSubscription = this._placesService.places$.subscribe(
      (places) => {
        this.loadedPlaces = places;
        this.relevantPlaces = this.loadedPlaces;
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
      }
    );
    this._subscription.add(offersSubscription);
  }
}
