import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  offer: Place;
  form: FormGroup;
  private _subscription: Subscription = new Subscription();
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _placeService: PlacesService,
    private readonly _navCtrl: NavController,
    private readonly _loadingCtr: LoadingController
  ) {
    this.initForm();
  }
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('offerId')) {
        console.log('no id:', paramMap);
        this._navCtrl.navigateBack('/places/tabs/offers');
      }
      const mySub = this._placeService
        .getPlace(paramMap.get('offerId'))
        .subscribe((place) => {
          this.offer = place;
          this.populateForm(this.offer);
        });
      this._subscription.add(mySub);
    });
  }

  onSavePlace() {
    if (this.form.invalid) {
      return;
    }
    this._loadingCtr
      .create({
        message: 'Saving place ... ',
        spinner: 'circles',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.offer.title = this.form.controls.title.value;
        this.offer.description = this.form.controls.description.value;
        this._placeService.updateOffer(this.offer).subscribe((places) => {
          loadingEl.dismiss();
        });
      });
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  private populateForm(offer: Place) {
    this.form.controls.title.setValue(offer.title);
    this.form.controls.description.setValue(offer.description);
  }
}
