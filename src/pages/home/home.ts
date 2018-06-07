import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, Nav, ToastController } from 'ionic-angular';
import { User, Permission } from '../../providers';
import { SideMenuItems } from '../../models/';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Nav) nav: Nav;
  pages: any[] = [];
  rootPage: any;
  constructor(private userSvc: User, private toastCtrl: ToastController, private permission: Permission) { }
  ngOnInit(): void {
    this.userSvc.getUserInformation().subscribe((res: any) => {
      /**
       * Update routing activities based on permissions
       */
      this.permission.getPermissions(res.userId).subscribe((response) => {
        if (response) {
          this.updateSideMenuItems(res);
        }
      }, (error) => {
        let toast = this.toastCtrl.create({
          message: 'Unable to get the permissions',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: 'Unable to get the user information',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  updateSideMenuItems(res) {
    for (let index = 0; index < SideMenuItems.pages.length; index++) {
      let page = SideMenuItems.pages[index];
      if (res.sideMenuPermissions === '*') { // For admin role
        page.visible = true;
        if (index === 0 && this.permission.hasPermission(page.permission)) {
          page.default = true;
          this.rootPage = page.component;
        }
        this.pages.push(page);
      }
      else if (res.sideMenuPermissions) { // For non admin role
        const sideMenuItems = res.sideMenuPermissions.split(',') || [];
        for (let count = 0; count < sideMenuItems.length; count++) {
          if (String(sideMenuItems[count]).toString().trim().toLowerCase() === page.title) {
            page.visible = true;
            if (count === 0 && this.permission.hasPermission(page.permission)) {
              page.default = true;
              this.rootPage = page.component;
            }
            this.pages.push(page);
          }
        }
      }
    }
  }

  openPage(page: any): void {
    if (this.permission.hasPermission(page.permission)) {
      this.nav.setRoot(page.component);
    }
  }
}