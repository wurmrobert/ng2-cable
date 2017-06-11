import { Broadcaster } from './broadcaster';
export declare class Ng2Cable {
    cable: any;
    channels: any;
    constructor(url: any);
    subscribe(channel: any): Broadcaster;
    unsubscribe(channel: any): void;
    perform(channel: any, action: any, data: any): void;
    connect(url: any): any;
    disconnect(): void;
}
