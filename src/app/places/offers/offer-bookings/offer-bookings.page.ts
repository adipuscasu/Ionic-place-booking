import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
place: Place;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _navCtrl: NavController,
    private readonly _placeService: PlacesService
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('offerId')){
          console.log('no offerId:', paramMap);
          this._navCtrl.navigateBack('/places/tabs/offers');
          return;
        }
        this.place = this._placeService.getPlace(paramMap.get('offerId'));
      }
    )
  }

}
