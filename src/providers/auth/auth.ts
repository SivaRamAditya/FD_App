import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class Auth {
    authNotifier: ReplaySubject<boolean>;
    validSession: boolean = false;
    constructor(private storage: Storage) {
        this.authNotifier = new ReplaySubject<boolean>(1);
        storage.ready().then(() => storage.get('sessionId')).then((response) => {
            this.validSession = this.isValid(response);
            this.authNotifier.next(this.validSession);            
        });
    }

    isValid(sessionInfo: any): boolean {
        let result = false;
        if(sessionInfo)
          result = true;
        return result;
    }

    setSession(sessionId: string): void {
        this.storage.set('sessionId',sessionId);
        this.validSession = true;
    }

    clearSession(): void {
        this.storage.clear();
        this.validSession = false;
    }
}