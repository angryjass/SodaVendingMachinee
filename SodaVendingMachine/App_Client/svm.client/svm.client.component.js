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
import { CoinsStorageDto } from '../models/coinsStorageDto';
import { SodaStorageDto } from '../models/sodaStorageDto';
var ClientComponent = /** @class */ (function () {
    function ClientComponent(dataService) {
        this.dataService = dataService;
        this.sodaDto = new SodaStorageDto();
        this.coinDto = new CoinsStorageDto();
        this.tableMode = true;
        this.coinsSum = 0;
        this.sodaSum = 0;
        this.infoText = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
        this.infoSumText = '';
    }
    ClientComponent.prototype.ngOnInit = function () {
        this.loadSoda();
        this.loadCoins();
    };
    ClientComponent.prototype.loadSoda = function () {
        var _this = this;
        this.dataService.getSodaStorage()
            .subscribe(function (data) { return _this.sodaArr = data.filter(function (a) { return a.value != 0; }); });
    };
    ClientComponent.prototype.loadCoins = function () {
        var _this = this;
        this.dataService.getCoinsStorage()
            .subscribe(function (data) { return _this.coinArr = data; });
    };
    ClientComponent.prototype.getNumber = function (str) {
        return Number(str.replace(/\D+/g, ""));
    };
    ClientComponent.prototype.addCoinToSum = function (num, event) {
        if (event.target.className != 'lockedCoinText') {
            this.coinsSum += num;
            this.addCoin(num);
            this.checkSum();
        }
    };
    ClientComponent.prototype.addCoin = function (num) {
        var coin = this.coinArr.find(function (coin) { return coin.name.match(num.toString()); });
        coin.value += 1;
    };
    ClientComponent.prototype.buySoda = function (soda) {
        var sodaClone = new SodaStorageDto();
        for (var param in soda) {
            sodaClone[param] = soda[param];
        }
        sodaClone.value = 1;
        if (this.coinsSum - this.sodaSum - sodaClone.price < 0)
            return;
        if (this.sodaForBuy != null) {
            if (this.sodaForBuy.find(function (s) { return s.id == sodaClone.id; }) != null)
                if (this.sodaArr.find(function (s) { return s.id == sodaClone.id; }).value - this.sodaForBuy.find(function (s) { return s.id == sodaClone.id; }).value - 1 < 0)
                    return;
        }
        this.addInSodaForBuy(sodaClone);
        this.infoSumText += sodaClone.name + ' ' + sodaClone.price + ' р. ';
        this.sodaSum += sodaClone.price;
        this.checkSum();
    };
    ClientComponent.prototype.addInSodaForBuy = function (soda) {
        if (this.sodaForBuy != null)
            if (this.sodaForBuy.find(function (s) { return s.id == soda.id; }) != null) {
                this.sodaForBuy.find(function (s) { return s.id == soda.id; }).value += 1;
            }
            else {
                this.sodaForBuy.push(soda);
            }
        else {
            this.sodaForBuy = [soda];
        }
    };
    ClientComponent.prototype.checkSum = function () {
        if (this.sodaSum > this.coinsSum) {
            this.infoText = "НЕДОСТАТОЧНО СРЕДСТВ";
        }
        else {
            this.infoText = this.infoSumText;
        }
    };
    ClientComponent.prototype.buy = function () {
        var _this = this;
        this.sodaArr.forEach(function (soda) {
            var sodaInBuy = _this.sodaForBuy.find(function (s) { return s.id == soda.id; });
            if (sodaInBuy != null)
                soda.value -= sodaInBuy.value;
        });
    };
    ClientComponent.prototype.giveChange = function () {
        var _this = this;
        var change = this.coinsSum - this.sodaSum;
        if (change < 0) {
            this.coinsSum = 0;
            this.infoText = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
            this.sodaSum = 0;
            this.sodaForBuy.splice(0, this.sodaForBuy.length);
            this.infoSumText = '';
            return;
        }
        this.coinArr.sort(function (a, b) { return _this.getNumber(b.name) - _this.getNumber(a.name); })
            .forEach(function (coin) {
            var coinValue = _this.getNumber(coin.name);
            var coinsValueForChange = Math.trunc(change / coinValue);
            var coinsValueInSVM = coin.value;
            if (coinsValueInSVM - coinsValueForChange < 0) {
                change -= coinsValueInSVM * coinValue;
                coin.value -= coinsValueInSVM;
            }
            else {
                change -= coinsValueForChange * coinValue;
                coin.value -= coinsValueForChange;
            }
        });
        this.coinArr.sort(function (a, b) { return _this.getNumber(a.name) - _this.getNumber(b.name); });
        this.buy();
        this.infoText = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
        this.sodaSum = 0;
        this.coinsSum = change;
        this.sodaForBuy.splice(0, this.sodaForBuy.length);
        this.infoSumText = '';
        this.dataService.updateCoinParams(this.coinArr)
            .subscribe(function () { return _this.loadCoins(); });
        this.dataService.updateSoda(this.sodaArr)
            .subscribe(function () { return _this.dataService.getSodaStorage().subscribe(function (data) { return _this.sodaArr = data.filter(function (a) { return a.value != 0; }); }); });
    };
    ClientComponent = __decorate([
        Component({
            selector: 'svm-client',
            templateUrl: './svm.client.component.html',
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], ClientComponent);
    return ClientComponent;
}());
export { ClientComponent };
//# sourceMappingURL=svm.client.component.js.map