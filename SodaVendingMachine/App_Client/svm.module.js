var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './svm.admin/svm.admin.component';
import { ClientComponent } from './svm.client/svm.client.component';
import { SVMRouter } from './svm.router';
var appRoutes = [
    { path: 'adminadmin', component: AdminComponent },
    { path: '', component: ClientComponent },
    { path: '**', redirectTo: '/' }
];
var SVMModule = /** @class */ (function () {
    function SVMModule() {
    }
    SVMModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
            declarations: [SVMRouter, AdminComponent, ClientComponent],
            bootstrap: [SVMRouter],
            exports: [RouterModule]
        })
    ], SVMModule);
    return SVMModule;
}());
export { SVMModule };
//# sourceMappingURL=svm.module.js.map