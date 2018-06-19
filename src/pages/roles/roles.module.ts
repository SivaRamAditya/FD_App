import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { RolesPage } from './roles';

@NgModule({
    declarations: [RolesPage],
    imports: [
        IonicPageModule.forChild(RolesPage),
        TranslateModule.forChild()
    ],
    exports: [RolesPage]
})
export class RolesPageModule { }