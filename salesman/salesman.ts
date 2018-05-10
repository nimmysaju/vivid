import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {PrintPage} from '../print/print';
import {TabsPage} from '../tabs/tabs';
import {RestProvider} from '../../providers/rest/rest';
import {GlobalVars} from '../../providers/globalvars/globalvars';
@Component({
    selector: 'page-salesman',
    templateUrl: 'salesman.html'
})
export class SalesmanPage {
    HomePage: any;
    TabsPage: any;
    PrintPage: any;
    cartitems: any;
    carttotal: any;
    errorMessage: any;
    loading: any;
    data: any;
    user: any;
    agents: any;
    agentselected: any;
    constructor(public navCtrl: NavController, public gvars: GlobalVars, public navParams: NavParams, private loadingCtrl: LoadingController, public rest: RestProvider) {
        this.HomePage = HomePage;
        this.PrintPage = PrintPage;
        this.TabsPage = TabsPage;
        this.presentLoadingDefault();
        this.cartitems = this.navParams.get('cartitems');
        this.carttotal = this.navParams.get('carttotal');
        this.user = this.navParams.get('userdata');
        this.rest.getAgents()
            .subscribe(
            products => {
                this.agents = products;
                this.agentselected=this.agents[0].ID;
                // Hide the loading message
                this.closeloading();
                //                this.setCartAmount();
            },
            error => this.errorMessage = <any> error);

    }

    openhomepage() {
        this.gvars.setAgentUsers(this.agentselected);
        this.navCtrl.setRoot(TabsPage);
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
