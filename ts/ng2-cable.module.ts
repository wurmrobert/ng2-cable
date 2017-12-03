import { Configuration } from './configuration';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ng2Cable } from './ng2-cable';
import { Broadcaster } from './broadcaster';

@NgModule({
  providers: [
    Ng2Cable,
    Broadcaster
  ]
})

export class Ng2CableModule {
    public static forConfig(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: Ng2CableModule,
            providers: [ {provide: Configuration, useFactory: configurationFactory}]
        }
    }
}