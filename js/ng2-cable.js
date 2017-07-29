"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ActionCable = require("actioncable");
var broadcaster_1 = require("./broadcaster");
var Ng2Cable = (function () {
    function Ng2Cable(url) {
        this.channels = {};
        this.connect(url);
    }
    Ng2Cable.prototype.subscribe = function (channel) {
        var channelName = (typeof (channel) === 'object') ? channel['channel'] : channel;
        var broadcaster = new broadcaster_1.Broadcaster();
        var subscription = this.cable.subscriptions.create(channel, {
            received: function (data) {
                broadcaster.broadcast((data.action || channel), data);
            }
        });
        this.channels[channelName] = {
            subscription: subscription,
            broadcaster: broadcaster
        };
        return broadcaster;
    };
    Ng2Cable.prototype.unsubscribe = function (channel) {
        var subscription = this.channels[channel].subscription;
        this.cable.subscriptions.remove(subscription);
    };
    Ng2Cable.prototype.perform = function (channel, action, data) {
        this.channels[channel].subscription.perform(action, data);
    };
    Ng2Cable.prototype.connect = function (url) {
        this.cable = ActionCable.createConsumer(url);
        this.cable.connect();
        return this.cable;
    };
    Ng2Cable.prototype.disconnect = function () {
        this.cable.disconnect();
    };
    return Ng2Cable;
}());
Ng2Cable = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String])
], Ng2Cable);
exports.Ng2Cable = Ng2Cable;
//# sourceMappingURL=/vagrant-ng2-cable/ng2-cable.js.map