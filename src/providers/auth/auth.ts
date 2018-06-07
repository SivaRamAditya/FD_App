import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class Auth {
    authNotifier: ReplaySubject<boolean>;
    constructor(private storage: Storage) {
        this.authNotifier = new ReplaySubject<boolean>(1);
        storage.ready().then(() => storage.get('sessionId')).then((response) => {
            this.authNotifier.next(this.isValid(response));
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
    }

    clearSession(): void {
        this.storage.clear();
    }
}