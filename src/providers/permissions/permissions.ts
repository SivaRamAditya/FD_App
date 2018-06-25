import { Injectable } from '@angular/core';
import { Api } from '../';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Permissions {
    constructor(private api: Api) { }
    getPermissions(userId: number): Observable<any> {
        let permissionSet = [
            { 'id': '1', 'name': 'Users', 'isCreate': true, 'isEdit': true, 'isDelete': true, 'isView': true, 'createdDate': new Date(2018, 5, 1) },
            { 'id': '2', 'name': 'Roles', 'isCreate': true, 'isEdit': true, 'isDelete': true, 'isView': true, 'createdDate': new Date(2018, 5, 1) },
            { 'id': '3', 'name': 'Permissions', 'isCreate': true, 'isEdit': true, 'isDelete': true, 'isView': true, 'createdDate': new Date(2018, 5, 1) },
            { 'id': '4', 'name': 'Party', 'isCreate': true, 'isEdit': true, 'isDelete': true, 'isView': true, 'createdDate': new Date(2018, 5, 1) },
        ];
        const api = Observable.of(permissionSet);
        return api;
    }
}