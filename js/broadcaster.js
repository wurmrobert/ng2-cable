"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx_1 = require("rxjs/Rx");
class Broadcaster {
    constructor() {
        this._eventBus = new Rx_1.Subject();
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