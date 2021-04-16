import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
place: Place;
private _subscription: Subscription = new Subscription();
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _navCtrl: NavController,
    private readonly _placeService: PlacesService
  ) { }
  ngOnDestroy(): void {
    if(this._subscription){
      this._subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('offerId')){
          console.log('no offerId:', paramMap);
          this._navCtrl.navigateBack('/places/tabs/offers');
          return;
        }
        const mySub = this._placeService.getPlace(paramMap.get('offerId')).subscribe((place) => {
          this.place = place;
        });
        this._subscription.add(mySub);
      }
    )
  }

}
