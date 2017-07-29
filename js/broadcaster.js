"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new Rx_1.Subject();
    }
    Broadcaster.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    Broadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    return Broadcaster;
}());
exports.Broadcaster = Broadcaster;
//# sourceMappingURL=/vagrant-ng2-cable/broadcaster.js.map