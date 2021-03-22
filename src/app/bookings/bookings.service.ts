import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _bookings: Array<Booking> = [
    {
      id: 'xyz',
      guestNumber: 2,
      placeId: 'p1',
      placeTitle: 'Manhattan Mansion',
      userId: 'abc'
    }
  ]

  constructor() {}

  public get bookings() {
    return [...this._bookings];
  }
}
