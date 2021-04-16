import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();
  public offers: Array<Place>;
  constructor(
    private readonly _placesService: PlacesService,
    private readonly _router: Router
  ) {}
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscribeToPlaces();
  }

  private subscribeToPlaces() {
    const offersSubscription = this._placesService.places$.subscribe(
      (places) => {
        this.offers = places;
      }
    );
    this._subscription.add(offersSubscription);
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item: ', offerId);
  }
}
