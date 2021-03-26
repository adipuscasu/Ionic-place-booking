import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
isLoading: boolean = false;
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _loadingController: LoadingController
  ) { }

  ngOnInit() {
  }
  onLogin(){
    this.isLoading = true;
    this._authService.login();
    this._loadingController.create({
      keyboardClose: true,
      message: 'Logging in',
      spinner: 'bubbles',
    }).then((loadingElement) => {
      loadingElement.present();
      setTimeout(() => {
        this.isLoading = false;
        this._loadingController.dismiss();
        this._router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }
}
