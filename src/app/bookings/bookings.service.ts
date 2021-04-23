import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private _bookings = new BehaviorSubject<Array<Booking>>([]);

  constructor(private readonly _authService: AuthService) {}

  public get bookings$() {
    return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random.toString(),
      placeId,
      this._authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
      return this.bookings$.pipe(
        take(1),
        tap((bookings) => {
          this._bookings.next(bookings.concat(newBooking));
        })
      );

  }

  cancelBooking(bookingId: string) {}
}
