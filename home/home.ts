import {Component} from '@angular/core';
import {NavController, Platform, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {RestProvider} from '../../providers/rest/rest';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    CartPage: any;
    public counter: number;
    products: any;
    productsmain: any;
    cartitems: any;
    cartcount: any;
    data: any;
    loading: any;
    errorMessage: string;
    searchTerm: string = '';
    public carttottal: number;
    constructor(public platform: Platform, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public params: NavParams, public navCtrl: NavController, public rest: RestProvider, public viewCtrl: ViewController) {
        this.counter = 1;
        this.CartPage = CartPage;
        this.presentLoadingDefault();
        this.rest.getProducts()
            .subscribe(
            products => {
                this.productsmain = products;
                this.products = this.productsmain;
                // Hide the loading message
                this.closeloading();
                //                this.setCartAmount();
            },
            error => this.errorMessage = <any> error);
//        console.log(gobsvar.getAgentUsers() + 'abc');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    ionViewDidLoad() {

        this.setFilteredItems();
        //this.setCartAmount();
    }

    getProducts() {

    }
    setCartAmount() {
        this.carttottal = 0;
        this.cartcount = 0;
        //this.cartitems.length = 0;
        for (let product of this.productsmain) {
            if (typeof (product.qty) !== 'undefined') {
                product.qty = parseInt(product.qty);
                if (product.qty > product.acf.quantity) {
                    this.presentAlert(product.acf.quantity);
                    if (product.acf.quantity !== 0 && product.acf.quantity !== '0')
                        product.qty = product.acf.quantity;
                    else {
                        product.qty = '';
                    }

                }
                this.carttottal = this.carttottal + (product.qty * product.acf.selling_price);
                this.cartcount = this.cartcount + product.qty;
                //this.cartitems.push(product);
                //console.log(JSON.stringify(this.cartitems));
            }
        }
    }
    checkMaxQty(qty, max) {
        if (qty !== 'undefined') {
            if (qty > max) {

            }
        }
    }
    presentAlert(max) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Available Stock is ' + max,
            buttons: ['OK']
        });
        alert.present();
    }
    addToCart() {
        this.cartitems = [];
        this.data = [];
        this.carttottal = 0;
        for (let product of this.productsmain) {
            if (typeof (product.qty) !== 'undefined') {
                if(product.qty > 0){
                this.carttottal = this.carttottal + (product.qty * product.acf.selling_price);
                if (product.acf.quantity !== 0 && product.acf.quantity !== "0")
                    this.cartitems.push(product);
                //console.log(JSON.stringify(this.cartitems));
                }
            }
        }
        this.data['cart_items'] = this.cartitems;
        this.data['cart_total'] = this.carttottal;
        this.data['cartcount'] = this.cartcount;
        this.navCtrl.push(CartPage, this.data);
    }

    setFilteredItems() {
        this.products = this.productsmain;
        if (this.searchTerm && this.searchTerm.trim() != '') {
            this.products = this.productsmain.filter((item) => {
                return (item.title.rendered.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });
        }
        else {
            this.products = this.productsmain;
        }
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
