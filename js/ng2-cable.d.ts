import { Configuration } from './configuration';
import { Broadcaster } from './broadcaster';
export declare class Ng2Cable {
    configuration: Configuration;
    cable: any;
    channels: any;
    constructor(configuration: Configuration);
    subscribe(channel: any, params?: {}): Broadcaster;
    unsubscribe(channel: string): void;
    perform(channel: string, action: string, data: any): void;
    connect(url: string): any;
    disconnect(): void;
}
