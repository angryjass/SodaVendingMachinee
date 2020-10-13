var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Coins } from '../models/coins';
import { SodaStorageDto } from '../models/sodaStorageDto';
var AdminComponent = /** @class */ (function () {
    function AdminComponent(dataService) {
        this.dataService = dataService;
        this.sodaDto = new SodaStorageDto();
        this.coin = new Coins();
        this.tableMode = true;
        this.coinsEdit = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.loadSoda();
        this.loadCoins();
    };
    AdminComponent.prototype.loadSoda = function () {
        var _this = this;
        this.dataService.getSodaStorage()
            .subscribe(function (data) { return _this.sodaArr = data; });
    };
    AdminComponent.prototype.loadCoins = function () {
        var _this = this;
        this.dataService.getCoinsStorage()
            .subscribe(function (data) { return _this.coinArr = data; });
    };
    AdminComponent.prototype.updateCoinsStorages = function () {
        var _this = this;
        this.coinsEdit = false;
        this.dataService.updateCoinParams(this.coinArr)
            .subscribe(function () { return _this.loadCoins(); });
    };
    AdminComponent.prototype.createSoda = function () {
        var _this = this;
        if (this.sodaDto.value == null) {
            this.sodaDto.value = 0;
        }
        this.dataService.createSoda(this.sodaDto)
            .subscribe(function () { return _this.loadSoda(); });
        this.cancel();
    };
    AdminComponent.prototype.updateSoda = function () {
        var _this = this;
        this.dataService.updateSoda(this.sodaArr)
            .subscribe(function () { return _this.loadSoda(); });
        this.cancel();
    };
    AdminComponent.prototype.imgChange = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            _this.sodaDto.img = reader.result.toString();
        };
    };
    AdminComponent.prototype.convertToImage = function (str) {
        var image = new Image();
        image.src = str;
        return image.baseURI;
    };
    AdminComponent.prototype.editSoda = function (s) {
        this.sodaDto = s;
    };
    AdminComponent.prototype.cancel = function () {
        this.sodaDto = new SodaStorageDto();
        this.tableMode = true;
    };
    AdminComponent.prototype.delete = function (s) {
        var _this = this;
        this.dataService.deleteSoda(s.id)
            .subscribe(function () { return _this.loadSoda(); });
    };
    AdminComponent.prototype.editCoins = function () {
        this.coinsEdit = true;
    };
    AdminComponent.prototype.add = function () {
        this.cancel();
        this.tableMode = false;
    };
    AdminComponent = __decorate([
        Component({
            selector: 'svm-admin',
            templateUrl: './svm.admin.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], AdminComponent);
    return AdminComponent;
}());
export { AdminComponent };
//# sourceMappingURL=svm.admin.component.js.map