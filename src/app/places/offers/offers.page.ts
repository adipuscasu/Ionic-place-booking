import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  public offers: Array<Place>;
  constructor(
    private readonly _placesService: PlacesService,
    private readonly _router: Router
  ) { }

  ngOnInit() {
    this.offers = this._placesService.places;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this._router.navigate(['/','places', 'tabs','offers', 'edit', offerId]);
    console.log('Editing item: ', offerId);
  }

}
