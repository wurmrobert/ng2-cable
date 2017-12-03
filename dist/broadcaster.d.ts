import { Observable } from 'rxjs/Rx';
export declare class Broadcaster {
    private _eventBus;
    broadcast(key: any, data?: any): void;
    on<T>(key: any): Observable<T>;
}
