import { Component } from '@angular/core';
import {Nav, NavParams, NavController, AlertController, LoadingController} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
     user_data: any;
    loggedin: any;
  LoginPage = LoginPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {

  }
   signOut() {
        window.localStorage.setItem('user_data', '');
        window.localStorage.setItem('loggedin', '');
        this.loggedin = '';
        this.user_data = '';
         this.navCtrl.setRoot(LoginPage);
    }
}
