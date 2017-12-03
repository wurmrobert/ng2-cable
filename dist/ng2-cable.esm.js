import { Subject } from 'rxjs/Rx';
import { Injectable, NgModule, Optional } from '@angular/core';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

var Broadcaster = /** @class */ (function () {
    function Broadcaster() {
        this._eventBus = new Subject();
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

var Configuration = /** @class */ (function () {
    function Configuration(url) {
        this.url = url;
    }
    return Configuration;
}());

var ActionCable = require('actioncable');
var Ng2CableService = /** @class */ (function () {
    function Ng2CableService(configuration) {
        this.configuration = configuration;
        this.channels = {};
        this.connect(configuration.url);
    }
    Ng2CableService.prototype.subscribe = function (channel, params) {
        if (params === void 0) { params = {}; }
        var channelName = (typeof (channel) === 'object') ? channel['channel'] : channel;
        var subscriptionParams = Object.assign({ channel: channel }, params);
        var broadcaster = new Broadcaster();
        var subscription = this.cable.subscriptions.create(subscriptionParams, {
            received: function (data) {
                broadcaster.broadcast(data.action, data);
            }
        });
        this.channels[channelName] = {
            subscription: subscription,
            broadcaster: broadcaster
        };
        return broadcaster;
    };
    Ng2CableService.prototype.unsubscribe = function (channel) {
        var subscription = this.channels[channel].subscription;
        this.cable.subscriptions.remove(subscription);
    };
    Ng2CableService.prototype.perform = function (channel, action, data) {
        this.channels[channel].subscription.perform(action, data);
    };
    Ng2CableService.prototype.connect = function (url) {
        this.cable = ActionCable.createConsumer(url);
        this.cable.connect();
        return this.cable;
    };
    Ng2CableService.prototype.disconnect = function () {
        this.cable.disconnect();
    };
    Ng2CableService = __decorate([
        Injectable(),
        __param(0, Optional()),
        __metadata("design:paramtypes", [typeof (_a = typeof Configuration !== "undefined" && Configuration) === "function" && _a || Object])
    ], Ng2CableService);
    return Ng2CableService;
    var _a;
}());

var Ng2CableModule = /** @class */ (function () {
    function Ng2CableModule() {
    }
    Ng2CableModule_1 = Ng2CableModule;
    Ng2CableModule.forConfig = function (configurationFactory) {
        return {
            ngModule: Ng2CableModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    Ng2CableModule = Ng2CableModule_1 = __decorate([
        NgModule({
            imports: [],
            providers: [
                Ng2CableService
            ]
        })
    ], Ng2CableModule);
    return Ng2CableModule;
    var Ng2CableModule_1;
}());

export { Broadcaster, Configuration, Ng2CableService, Ng2CableModule };
//# sourceMappingURL=ng2-cable.esm.js.map
