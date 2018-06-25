import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { Auth, UserPermission } from '../../providers';

@IonicPage()
@Component({
    selector: 'page-roles-details',
    templateUrl: 'roles-details.html'
})
export class RoleDetails implements OnInit {
    form: FormGroup;
    constructor(private auth: Auth, private userPermission: UserPermission, private fb: FormBuilder, private navCtrl: NavController) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
            description: new FormControl('')
        });
    }

    ionViewCanEnter() {
        return this.auth.validSession;
    }
}