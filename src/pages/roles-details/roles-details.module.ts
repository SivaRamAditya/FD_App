import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleDetails } from './role-details';

@NgModule({
    declarations: [RoleDetails],
    imports: [
        IonicPageModule.forChild(RoleDetails),
        TranslateModule.forChild()
    ],
    exports: [RoleDetails]
})
export class RolesDetailsModule {

}