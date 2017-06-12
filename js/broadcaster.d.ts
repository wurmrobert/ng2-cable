import { Observable } from 'rxjs/Rx';
export declare class Broadcaster {
    private _eventBus;
    constructor();
    broadcast(key: any, data?: any): void;
    on<T>(key: any): Observable<T>;
}
