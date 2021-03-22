import { Component, OnInit } from '@angular/core';
import { IonItemOption, IonItemSliding } from '@ionic/angular';
import { Booking } from './booking.model';
import { BookingService as BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  public loadedBookings: Array<Booking>;

  constructor(
    private readonly _bookingService: BookingsService,
  ) { }

  ngOnInit() {
    this.loadedBookings = this._bookingService.bookings;
  }
  public onCancelBooking(bookingId: string, slidingItem: IonItemSliding){
    console.log('deleting booking: ', bookingId);
    slidingItem.close();
  }
}
