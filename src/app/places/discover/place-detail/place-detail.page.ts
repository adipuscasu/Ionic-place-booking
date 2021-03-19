import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
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
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _modalCtrl: ModalController
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
    // this._navCtrl.navigateBack('/places/tabs/discover');
    console.log('place: ', this.place);
    this._modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData =>{
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm'){
        console.log('BOOKED!');
      }
    })
  }
}
