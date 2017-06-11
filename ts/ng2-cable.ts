import { Injectable } from '@angular/core'
import * as ActionCable from 'actioncable';
import { Broadcaster } from './broadcaster';

@Injectable()
export class Ng2Cable {
  public cable: any;
  public channels : any = {};

  constructor(url) {
    this.connect(url);
  }

  subscribe(channel) : Broadcaster {
    let channelName = (typeof(channel) === 'object') ? channel['channel'] : channel,
        broadcaster = new Broadcaster(),
        subscription = this.cable.subscriptions.create(channel, {
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

  unsubscribe(channel) : void {
    let subscription = this.channels[channel].subscription;
    this.cable.subscriptions.remove(subscription);
  }

  perform(channel, action, data) : void {
    this.channels[channel].subscription.perform(action, data);
  }

  connect(url): any {
    this.cable = ActionCable.createConsumer(url);
    this.cable.connect();
    return this.cable;
  }

  disconnect(): void {
    this.cable.disconnect();
  }
}
