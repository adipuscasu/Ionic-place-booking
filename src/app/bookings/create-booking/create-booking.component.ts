import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
@Input() selectedPlace: Place;

  constructor(
    private readonly _modalCtrl: ModalController
  ) { }

  ngOnInit() {}
  onBookPlace(){
    this._modalCtrl.dismiss({message: 'This is a dummmy message!'}, 'confirm');
  }

  onCancel(){
    this._modalCtrl.dismiss(null, 'cancel');
  }
}
