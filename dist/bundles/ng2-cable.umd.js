(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Subject'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('actioncable'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Subject', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'actioncable', '@angular/core'], factory) :
	(factory((global['ng2-cable'] = global['ng2-cable'] || {}),global.rxjs_Subject,null,global.Rx.Observable.prototype,global.ActionCable,global.ng.core));
}(this, (function (exports,rxjs_Subject,rxjs_add_operator_filter,rxjs_add_operator_map,ActionCable,_angular_core) { 'use strict';

var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new rxjs_Subject.Subject();
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

var Configuration = (function () {
    function Configuration(url) {
        this.url = url;
    }
    return Configuration;
}());

var Ng2CableService = (function () {
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
        if (!this.channels[channel].subscription) {
            console.error("Unable to unsubscribe channel with name " + channel + " from ng2-cable!");
        }
        else {
            var subscription = this.channels[channel].subscription;
            this.cable.subscriptions.remove(subscription);
        }
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
    Ng2CableService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    Ng2CableService.ctorParameters = function () { return [
        { type: Configuration, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    return Ng2CableService;
}());

var Ng2CableModule = (function () {
    function Ng2CableModule() {
    }
    Ng2CableModule.forConfig = function (configurationFactory) {
        return {
            ngModule: Ng2CableModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    Ng2CableModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [],
                    providers: [
                        Ng2CableService
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2CableModule.ctorParameters = function () { return []; };
    return Ng2CableModule;
}());

exports.Broadcaster = Broadcaster;
exports.Configuration = Configuration;
exports.Ng2CableService = Ng2CableService;
exports.Ng2CableModule = Ng2CableModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
