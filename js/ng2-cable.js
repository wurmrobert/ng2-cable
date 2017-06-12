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
const core_1 = require("@angular/core");
const ActionCable = require("actioncable");
const broadcaster_1 = require("./broadcaster");
let Ng2Cable = class Ng2Cable {
    constructor(url) {
        this.channels = {};
        this.connect(url);
    }
    subscribe(channel) {
        let channelName = (typeof (channel) === 'object') ? channel['channel'] : channel, broadcaster = new broadcaster_1.Broadcaster(), subscription = this.cable.subscriptions.create(channel, {
            received: (data) => {
                broadcaster.broadcast((data.action || channel), data);
            }
        });
        this.channels[channelName] = {
            subscription: subscription,
            broadcaster: broadcaster
        };
        return broadcaster;
    }
    unsubscribe(channel) {
        let subscription = this.channels[channel].subscription;
        this.cable.subscriptions.remove(subscription);
    }
    perform(channel, action, data) {
        this.channels[channel].subscription.perform(action, data);
    }
    connect(url) {
        this.cable = ActionCable.createConsumer(url);
        this.cable.connect();
        return this.cable;
    }
    disconnect() {
        this.cable.disconnect();
    }
};
Ng2Cable = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String])
], Ng2Cable);
exports.Ng2Cable = Ng2Cable;
//# sourceMappingURL=/vagrant-ng2-cable/ng2-cable.js.map