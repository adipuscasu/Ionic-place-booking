import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  offer: Place;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _placeService: PlacesService,
    private readonly _navCtrl: NavController
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('offerId')) {
        console.log('no id:', paramMap);
        this._navCtrl.navigateBack('/places/tabs/offers');
      }
      this.offer = this._placeService.getPlace(paramMap.get('offerId'));
    });
  }
}
