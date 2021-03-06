import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private readonly _router: Router,
    private readonly _navCtrl: NavController,
    private readonly _placesService: PlacesService,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('placeId')) {
        console.log('no id:', paramMap);
        this._navCtrl.navigateBack('/places/tabs/discover');
      }
      this.place = this._placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this._router.navigate(['/places/tabs/discover']);
    this._navCtrl.navigateBack('/places/tabs/discover');
  }
}
