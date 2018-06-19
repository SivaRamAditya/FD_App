import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Auth } from '../../providers';
@IonicPage()
@Component({
    selector: 'page-roles',
    templateUrl: 'roles.html'
})
export class RolesPage implements OnInit {
    roles: any[] = [];
    constructor(private auth: Auth) { }
    ngOnInit() {
        this.roles = [
            { roleName: 'Admin', description: 'Admin will configure related to this website.' },
            { roleName: 'Client', description: 'Admin will configure related to this website.Client will use the features granted by admin' },
            { roleName: 'Tenant', description: 'Admin will configure related to this website.' },
            { roleName: 'Test', description: 'Admin will configure related to this website.' },
          ];
    }

    ionViewCanEnter() {
        return this.auth.validSession;
    }
}