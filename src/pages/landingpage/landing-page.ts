import { Component } from "@angular/core";
//import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-landing',
    templateUrl: 'landing-page.html'
})
export class LandingPage {
   constructor(public navCtrl: NavController) {}

   redirectToLogin() {
       this.navCtrl.setRoot('LoginPage');
   }

   signup() {

   }
}