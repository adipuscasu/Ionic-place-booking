import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _placeService: PlacesService,
    private readonly _navCtrl: NavController
  ) {
    this.initForm();
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('offerId')) {
        console.log('no id:', paramMap);
        this._navCtrl.navigateBack('/places/tabs/offers');
      }
      this.offer = this._placeService.getPlace(paramMap.get('offerId'));
      this.populateForm(this.offer);
    });
  }


  onSavePlace(){
    if(this.form.invalid) {
      return;
    }
    this.offer.title = this.form.controls.title.value;
    this.offer.description = this.form.controls.description.value;
    this._placeService.savePlace(this.offer);

  }

  private initForm(){
    this.form = new FormGroup({
      title : new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  private populateForm(offer: Place){
    this.form.controls.title.setValue(offer.title);
    this.form.controls.description.setValue(offer.description);
  }
}
