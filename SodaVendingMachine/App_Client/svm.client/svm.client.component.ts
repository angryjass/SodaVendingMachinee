import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { CoinsStorageDto } from '../models/coinsStorageDto';
import { SodaStorageDto } from '../models/sodaStorageDto';

@Component({
    selector: 'svm-client',
    templateUrl: './svm.client.component.html',
    providers: [DataService]
})
export class ClientComponent implements OnInit {

    sodaDto: SodaStorageDto = new SodaStorageDto();
    sodaArr: SodaStorageDto[];
    coinDto: CoinsStorageDto = new CoinsStorageDto();
    coinArr: CoinsStorageDto[];
    tableMode: boolean = true;
    coinsSum: number = 0;
    sodaSum: number = 0;
    sodaForBuy: SodaStorageDto[];
    infoText: string = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
    infoSumText: string = '';

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadSoda();
        this.loadCoins();
    }

    loadSoda() {
        this.dataService.getSodaStorage()
            .subscribe((data: SodaStorageDto[]) => this.sodaArr = data.filter(a => a.value != 0));
    }

    loadCoins() {
        this.dataService.getCoinsStorage()
            .subscribe((data: CoinsStorageDto[]) => this.coinArr = data);
    }

    getNumber(str: string) {
        return Number(str.replace(/\D+/g, ""));
    }

    addCoinToSum(num: number, event: any) {
        if (event.target.className != 'lockedCoinText') {
            this.coinsSum += num;
            this.addCoin(num);
            this.checkSum();
        }
    }

    addCoin(num: number) {
        let coin = this.coinArr.find(coin => coin.name.match(num.toString()))
        coin.value += 1
    }

    buySoda(soda: SodaStorageDto) {

        var sodaClone = new SodaStorageDto()

        for (var param in soda) {
            sodaClone[param] = soda[param]
        }

        sodaClone.value = 1;

        if (this.coinsSum - this.sodaSum - sodaClone.price < 0)
            return

        if (this.sodaForBuy != null) {
            if (this.sodaForBuy.find(s => s.id == sodaClone.id) != null)
                if (this.sodaArr.find(s => s.id == sodaClone.id).value - this.sodaForBuy.find(s => s.id == sodaClone.id).value - 1 < 0)
                    return
        }

        this.addInSodaForBuy(sodaClone)


        this.infoSumText += sodaClone.name + ' ' + sodaClone.price + ' р. '
        this.sodaSum += sodaClone.price

        this.checkSum()

    }

    addInSodaForBuy(soda: SodaStorageDto) {
        if (this.sodaForBuy != null)
            if (this.sodaForBuy.find(s => s.id == soda.id) != null) {
                this.sodaForBuy.find(s => s.id == soda.id).value += 1
            }
            else {
                this.sodaForBuy.push(soda)
            }
        else {
            this.sodaForBuy = [soda]
        }
    }

    checkSum() {
        if (this.sodaSum > this.coinsSum) {
            this.infoText = "НЕДОСТАТОЧНО СРЕДСТВ"
        }
        else {
            this.infoText = this.infoSumText
        }
    }

    buy() {
        this.sodaArr.forEach(soda => {
            let sodaInBuy = this.sodaForBuy.find(s => s.id == soda.id)
            if (sodaInBuy != null)
                soda.value -= sodaInBuy.value
        })
    }

    giveChange() {
        let change = this.coinsSum - this.sodaSum
        if (change < 0) {
            this.coinsSum = 0;
            this.infoText = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
            this.sodaSum = 0;
            this.sodaForBuy.splice(0, this.sodaForBuy.length);
            this.infoSumText = ''
            return;
        }
        this.coinArr.sort((a, b) => this.getNumber(b.name) - this.getNumber(a.name))
            .forEach(coin => {

                let coinValue = this.getNumber(coin.name);
                let coinsValueForChange = Math.trunc(change / coinValue);
                let coinsValueInSVM = coin.value;

                if (coinsValueInSVM - coinsValueForChange < 0) {
                    change -= coinsValueInSVM * coinValue;
                    coin.value -= coinsValueInSVM;
                }
                else {
                    change -= coinsValueForChange * coinValue;
                    coin.value -= coinsValueForChange;
                }
            })

        this.coinArr.sort((a, b) => this.getNumber(a.name) - this.getNumber(b.name));

        this.buy()

        this.infoText = 'ВНЕСИТЕ МОНЕТЫ И НАЖМИТЕ НА НАПИТОК';
        this.sodaSum = 0;
        this.coinsSum = change;
        this.sodaForBuy.splice(0, this.sodaForBuy.length);
        this.infoSumText = ''

        this.dataService.updateCoinParams(this.coinArr)
            .subscribe(() => this.loadCoins());
        this.dataService.updateSoda(this.sodaArr)
            .subscribe(() => this.dataService.getSodaStorage().subscribe((data: SodaStorageDto[]) => this.sodaArr = data.filter(a => a.value != 0)));

    }
}