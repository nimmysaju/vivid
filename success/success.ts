import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {PrintPage} from '../print/print';

@Component({
    selector: 'page-success',
    templateUrl: 'success.html'
})
export class SuccessPage {
    HomePage: any;
    PrintPage: any;
    cartitems: any;
    carttotal: any;
    arragmentsfee: any;
    data: any;
    user: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.PrintPage = PrintPage;
        this.cartitems = this.navParams.get('cartitems');
        this.carttotal = this.navParams.get('carttotal');
        this.arragmentsfee = this.navParams.get('arragmentsfee');
        this.user = this.navParams.get('userdata');

    }
    loadPrint() {
        this.data = [];
        this.data['cartitems'] = this.cartitems;
        this.data['carttotal'] = this.carttotal;
        this.data['arragmentsfee'] = this.arragmentsfee;
        this.data['userdata'] = this.user;
        this.navCtrl.push(PrintPage, this.data);
    }
    newOrder(){
        this.navCtrl.setRoot(HomePage);
    }

}
