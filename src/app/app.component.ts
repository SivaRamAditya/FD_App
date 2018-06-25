import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ToastController } from 'ionic-angular';
import { FirstRunPage, MainPage } from '../pages';
import { Settings, Auth, User, UserPermission } from '../providers';
import { SideMenuItems } from './../models/';

@Component({
  templateUrl: `app.component.html`
})
export class MyApp {
  rootPage: any;
  isLoggedIn: boolean = false;
  pages: any[] = [];
  @ViewChild(Nav) nav: Nav;

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private auth: Auth, private userSvc: User, private userPermission: UserPermission, private toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.auth.callBack = () => { this.getUserInformation(); this.isLoggedIn = true; };
      this.auth.authNotifier.subscribe((response) => {
        if (response) {
          this.rootPage = MainPage;
          this.isLoggedIn = true;
          this.getUserInformation();
        }
        else
          this.rootPage = FirstRunPage;
      });
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (this.userPermission.hasPermission(page.permission)) {
      this.nav.setRoot(page.component);
    }
  }

  logout(): void {
    this.auth.clearSession();
    this.nav.setRoot('LandingPage');
    this.rootPage = 'LandingPage';
  }

  getUserInformation() {
    this.userSvc.getUserInformation().subscribe((res: any) => {
      /**
       * Update routing activities based on permissions
       */
      this.userPermission.getUserPermissions(res.userId).subscribe((response) => {
        if (response) {
          this.updateSideMenuItems(res);
        }
      }, (error) => {
        const toast = this.toastCtrl.create({
          message: 'Unable to get the permissions',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }, (error) => {
      const toast = this.toastCtrl.create({
        message: 'Unable to get the user information',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  updateSideMenuItems(res) {
    for (let index = 0; index < SideMenuItems.pages.length; index++) {
      let page = SideMenuItems.pages[index];
      if (res.sideMenuPermissions === '*') { // For admin role
        page.visible = true;
        if (index === 0 && this.userPermission.hasPermission(page.permission)) {
          page.default = true;
          this.rootPage = page.component;
        }
        this.pages.push(page);
      }
      else if (res.sideMenuPermissions) { // For non admin role
        const sideMenuItems = res.sideMenuPermissions.split(',') || [];
        for (let count = 0; count < sideMenuItems.length; count++) {
          if (String(sideMenuItems[count]).toString().trim().toLowerCase() === page.title) {
            page.visible = true;
            if (count === 0 && this.userPermission.hasPermission(page.permission)) {
              page.default = true;
              this.rootPage = page.component;
            }
            this.pages.push(page);
          }
        }
      }
    }
  }
}
