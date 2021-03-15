import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { SplashScreen } = Plugins;
const { StatusBar } = Plugins;
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isStatusBarLight = true;

  statusBar: any;
  constructor(
    private platform: Platform,

    private authService: AuthService,
    private router: Router
  ) {}

  initializeAppp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({
        style: this.isStatusBarLight
          ? StatusBarStyle.Dark
          : StatusBarStyle.Light,
      });
      // Hide the splash (you should do this on app launch)
      SplashScreen.hide();
    });
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }
  onLogout() {
    console.log('logging out: ');
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
