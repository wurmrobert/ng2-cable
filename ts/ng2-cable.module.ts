import { Configuration } from './configuration';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ng2CableService } from './ng2-cable.service';
import { Broadcaster } from './broadcaster';

@NgModule({
	imports: [],
	providers: [
		Ng2CableService,
		Broadcaster
	]
})
export class Ng2CableModule {
	public static forConfig(configurationFactory: () => Configuration): ModuleWithProviders {
		return {
			ngModule: Ng2CableModule,
			providers: [{ provide: Configuration, useFactory: configurationFactory }]
		}
	}
}