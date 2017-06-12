"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("rxjs/Subject");
class Broadcaster {
    constructor() {
        this._eventBus = new Subject_1.Subject();
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
exports.Broadcaster = Broadcaster;
//# sourceMappingURL=/vagrant-ng2-cable/broadcaster.js.map