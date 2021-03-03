import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(
    private readonly _router: Router,
    private readonly _navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onBookPlace(){
    // this._router.navigate(['/places/tabs/discover']);
    this._navCtrl.navigateBack('/places/tabs/discover');
  }
}
