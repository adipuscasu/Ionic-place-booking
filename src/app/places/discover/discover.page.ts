import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public loadedPlaces: Array<Place>;
  public loadedListPlaces: Array<Place>;

  constructor(
    private readonly _placesService: PlacesService,
    private readonly _menuController: MenuController
  ) { }

  ngOnInit() {
    this.loadedPlaces = this._placesService.places;
    this.loadedListPlaces = this.loadedPlaces;
  }
}
