"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var configuration_1 = require("./configuration");
var core_1 = require("@angular/core");
var ng2_cable_1 = require("./ng2-cable");
var broadcaster_1 = require("./broadcaster");
var Ng2CableModule = /** @class */ (function () {
    function Ng2CableModule() {
    }
    Ng2CableModule_1 = Ng2CableModule;
    Ng2CableModule.forConfig = function (configurationFactory) {
        return {
            ngModule: Ng2CableModule_1,
            providers: [{ provide: configuration_1.Configuration, useFactory: configurationFactory }]
        };
    };
    Ng2CableModule = Ng2CableModule_1 = __decorate([
        core_1.NgModule({
            providers: [
                ng2_cable_1.Ng2Cable,
                broadcaster_1.Broadcaster
            ]
        })
    ], Ng2CableModule);
    return Ng2CableModule;
    var Ng2CableModule_1;
}());
exports.Ng2CableModule = Ng2CableModule;
//# sourceMappingURL=/Users/robertwurm/Documents/EasySolutions/GitHub/ng2-cable/ng2-cable.module.js.map