import { Broadcaster } from './broadcaster';
export declare class Ng2Cable {
    cable: any;
    channels: any;
    constructor(url: string);
    subscribe(channel: any): Broadcaster;
    unsubscribe(channel: string): void;
    perform(channel: string, action: string, data: any): void;
    connect(url: string): any;
    disconnect(): void;
}
