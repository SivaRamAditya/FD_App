import { Injectable } from '@angular/core';
import { Api } from '../';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Permission {
    pagePermissionSet: any[];
    constructor(private api: Api) { }

    getPermissions(userId: number): Observable<any> {
        this.pagePermissionSet = ['users.view', 'users.add', 'users.edit', 'users.delete', 'listmaster.view', 'cards.view', 'tabs.view', 'tabs.edit', 'tabs.add', 'search.view', 'content.view'];
        const api = Observable.of(true);
        return api;
    }

    hasPermission(permission: any): boolean {
        let result = false;
        if (this.pagePermissionSet && this.pagePermissionSet.length > 0) {
            for (let index = 0; index < this.pagePermissionSet.length; index++) {
                if (this.pagePermissionSet[index].trim().toLowerCase() === permission) {
                   result = true;
                   break;
                }
            }
        }
        return result;
    }

}