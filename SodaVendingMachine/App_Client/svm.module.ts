import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './svm.admin/svm.admin.component';
import { ClientComponent } from './svm.client/svm.client.component';
import { SVMRouter } from './svm.router';

const appRoutes: Routes = [
    { path: 'adminadmin', component: AdminComponent },
    { path: '', component: ClientComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [SVMRouter, AdminComponent, ClientComponent],
    bootstrap: [SVMRouter],
    exports: [RouterModule]
})
export class SVMModule { }

