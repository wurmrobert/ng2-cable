import { Configuration } from './configuration';
import { Injectable, Optional } from '@angular/core';
import ActionCable from 'actioncable';
import { Broadcaster } from './broadcaster';

@Injectable()
export class Ng2CableService {
  public cable: any;
  public channels : any = {};

  constructor(@Optional() public configuration: Configuration) {
    this.connect(configuration.url);
  }

  subscribe(channel : any, params={}) : Broadcaster {
    let channelName = (typeof(channel) === 'object') ? channel['channel'] : channel;
    let subscriptionParams = Object.assign({ channel: channel }, params);
    let broadcaster = new Broadcaster();
    let subscription = this.cable.subscriptions.create(subscriptionParams, {
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

  unsubscribe(channel : string) : void {
    let subscription = this.channels[channel].subscription;
    this.cable.subscriptions.remove(subscription);
  }

  perform(channel : string, action : string, data : any) : void {
    this.channels[channel].subscription.perform(action, data);
  }

  connect(url : string): any {
    this.cable = ActionCable.createConsumer(url);
    this.cable.connect();
    return this.cable;
  }

  disconnect(): void {
    this.cable.disconnect();
  }
}
