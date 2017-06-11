import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
export class Broadcaster {
    constructor() {
        this._eventBus = new Subject();
    }
    broadcast(key, data) {
        this._eventBus.next({ key, data });
    }
    on(key) {
        return this._eventBus.asObservable()
            .filter(event => event.key === key)
            .map(event => event.data);
    }
}
//# sourceMappingURL=/vagrant-ng2-cable/broadcaster.js.map