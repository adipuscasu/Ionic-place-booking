import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public loadedPlaces: Array<Place>;

  constructor(
    private readonly _placesService: PlacesService
  ) { }

  ngOnInit() {
    this.loadedPlaces = this._placesService.places;
  }

}
