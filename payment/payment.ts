import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Nav, NavParams, NavController, AlertController, LoadingController} from 'ionic-angular';

import {SuccessPage} from '../success/success';
import {RestProvider} from '../../providers/rest/rest';
import {GlobalVars} from '../../providers/globalvars/globalvars';

@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html'
})
export class PaymentPage {

    @ViewChild(Nav) nav: Nav;
    pages: Array<{title: string, component: any}>;
    activePage: any;
    SuccessPage: any;
    data: any;
    errorMessage: any;
    user: any;
    loading: any;
    submitAttempt: any;
    result: any;
    cartcount: any;
    arragmentsfee: any;
    cartForm: FormGroup;
    cartitems: any;
    carttotal: any;
    navdata: any; dateStr: any;
    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public gobsvar: GlobalVars, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public navParams: NavParams, public rest: RestProvider) {
        this.cartForm = formBuilder.group({
            payment_method: ['', Validators.compose([])],
            invoicenum: ['', Validators.compose([])],
            remarks: ['', Validators.compose([])],
            name: ['', Validators.compose([])],
            address: ['', Validators.compose([])],
            description: ['', Validators.compose([])]
        });
        this.user = {payment_method: '', invoicenum: '', remarks: '', name: '', address: '', description: ''};
        this.cartitems = this.navParams.get('cartitems');
        this.carttotal = this.navParams.get('carttotal');
        this.arragmentsfee = this.navParams.get('arragmentsfee');
        this.cartcount = this.navParams.get('cartcount');
        this.SuccessPage = SuccessPage;
        this.submitAttempt = false;
        this.user = {};
        this.data = {data: this.navParams.get('checkoutitems'), agent: gobsvar.getAgentUsers(), arragements_fee: this.navParams.get('arragmentsfee'), carttotal: this.navParams.get('carttotal'), user: ''};

        //        this.data.push(newitems);
        var temp = new Date();
        this.dateStr = temp.getFullYear().toString() + temp.getMonth().toString() + temp.getDate().toString() + temp.getHours().toString() + temp.getMinutes().toString() + temp.getSeconds().toString();


    }
    submitPurchase() {
        //console.log(JSON.stringify(this.user));

        this.submitAttempt = true;

        if (!this.cartForm.valid) {
            this.presentAlert();
        }
        else {
            this.navdata = [];
            this.presentLoadingDefault();
            this.data.user = this.user;
            this.rest.checkoutCart(this.data)
                .subscribe(
                result => {
                    this.closeloading();
                    this.result = result;
                    // Hide the loading message
                    if (this.result.status === "success") {
                        this.presentAlertSuccess();
                        this.navdata['cartitems'] = this.cartitems;
                        this.navdata['carttotal'] = this.carttotal;
                        this.navdata['arragmentsfee'] = this.arragmentsfee;
                        this.user.invoicenum = this.result.inv_no;
                        this.navdata['userdata'] = this.user;
                        this.navCtrl.setRoot(SuccessPage, this.navdata);
                    }
                },
                error => this.errorMessage = <any> error);
        }
    }
    presentAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Please enter all fields',
            buttons: ['OK']
        });
        alert.present();
    }
    presentAlertSuccess() {
        let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Order Created Successfully',
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
    //tab1Root: any = DeliverytabPage;

}


