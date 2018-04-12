import * as ActionCable from 'actioncable';
import { Configuration } from './configuration';
import { Injectable, Optional } from '@angular/core';
import { Broadcaster } from './broadcaster';
export var Ng2CableService = (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    Ng2CableService.ctorParameters = function () { return [
        { type: Configuration, decorators: [{ type: Optional },] },
    ]; };
    return Ng2CableService;
}());
//# sourceMappingURL=ng2-cable.js.map