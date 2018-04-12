import { Configuration } from './configuration';
import { NgModule } from '@angular/core';
import { Ng2CableService } from './ng2-cable';
export var Ng2CableModule = (function () {
    function Ng2CableModule() {
    }
    Ng2CableModule.forConfig = function (configurationFactory) {
        return {
            ngModule: Ng2CableModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    Ng2CableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    providers: [
                        Ng2CableService
                    ]
                },] },
    ];
    /** @nocollapse */
    Ng2CableModule.ctorParameters = function () { return []; };
    return Ng2CableModule;
}());
//# sourceMappingURL=ng2-cable.module.js.map