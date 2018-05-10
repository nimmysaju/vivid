import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopoverController, Nav, NavParams, NavController, AlertController, LoadingController} from 'ionic-angular';

import {HomePage} from '../home/home';
import {CartPage} from '../cart/cart';
import {UserService} from '../../app/userservice';
//import {SignupPage} from '../signup/signup';
import {RestProvider} from '../../providers/rest/rest';
import {GlobalVars} from '../../providers/globalvars/globalvars';
import {TabsPage} from '../tabs/tabs';
@Component({
    template: `
    <ion-list class="popover-page">
      <ion-item class="text-athelas">
        <ion-label>Menu</ion-label>
      </ion-item>
      <ion-item class="text-charter">
        <ion-label>Menu</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPagesigin {


    constructor(private navParams: NavParams) {

    }
}
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    offerPage: any;
    CartPage: any;
    TabsPage: any;
    DeliveryPage: any;
    HomePage: any;
    SignupPage: any;
    loginForm: FormGroup;
    reg: any;
    res: any;
    loading: any;
    cartItems: any;
    cartItemsCount: number;

    @ViewChild(Nav) nav: Nav;
    activePage: any;
    constructor(public navCtrl: NavController, public gvars: GlobalVars, public userService: UserService, public navParams: NavParams, public globalvars: GlobalVars, private alertCtrl: AlertController, public rest: RestProvider, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, private popoverCtrl: PopoverController) {
        //        this.DeliveryPage = DeliveryPage;
        this.CartPage = CartPage;
        this.TabsPage = TabsPage;
        //        this.SignupPage = SignupPage;
        this.HomePage = HomePage;
        this.clientHeight = window.innerHeight;
        this.reg = {username: '', password: ''};
        this.loginForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required,])],
            password: ['', Validators.compose([Validators.required,])],
        });
        //         this.cartItems = this.globalvars.getCart();
        //        this.cartItemsCount = this.cartItems.length;
        //this.delivery_op = "delivery";
    }
    //tab1Root: any = DeliverytabPage;
    clientHeight: number;
    presentPopover(ev) {

        let popover = this.popoverCtrl.create(PopoverPagesigin);

        popover.present({
            ev: ev
        });
    }

    user_login() {
        this.presentLoadingDefault()
        this.rest.loginUser(this.reg).subscribe(
            result => {
                this.closeloading();
                window.localStorage.setItem('user_data', JSON.stringify(result));

                const token = window.localStorage.getItem('user_data');
                this.res = JSON.parse(token);
                console.log(this.res.user_email);
                window.localStorage.setItem('loggedin', 'verified_login');
                //this.navCtrl.setRoot(RegistersuccessPage);
                this.userService.setCurrentUser(result);
                this.openhomepage();
            },
            error => {
                console.log(error);
                this.closeloading();
                this.presentAlertError(error);
            });
    }
    openhomepage() {
        const token = window.localStorage.getItem('user_data');
        this.res = JSON.parse(token);
        this.gvars.setAgentUsers(this.res.user_email);
        this.navCtrl.setRoot(TabsPage);
    }
    presentAlertError(error_msg) {
        //                        console.log(error_msg);

        error_msg = JSON.parse(error_msg);
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: error_msg.message,
            buttons: ['OK']
        });
        alert.present();
    }
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();
    }
    closeloading() {
        this.loading.dismiss();
    }
}
