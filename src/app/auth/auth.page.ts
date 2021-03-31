import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isLogin: boolean = true;
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _loadingController: LoadingController
  ) {}

  ngOnInit() {}
  onLogin() {
    this.isLoading = true;
    this._authService.login();
    this._loadingController
      .create({
        keyboardClose: true,
        message: 'Logging in',
        spinner: 'bubbles',
      })
      .then((loadingElement) => {
        loadingElement.present();
        setTimeout(() => {
          this.isLoading = false;
          this._loadingController.dismiss();
          this._router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
  }
  onSubmit(form: NgForm) {
    if(form.invalid) { return;}
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
    if(this.isLogin) {
      // send a request to login
    } else {
      // send a request to signup
    }

  }

  onToggle(){
    this.isLogin = !this.isLogin;
  }
}
