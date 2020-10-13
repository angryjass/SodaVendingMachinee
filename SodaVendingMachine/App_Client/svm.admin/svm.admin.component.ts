import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Soda } from '../models/soda';
import { Coins } from '../models/coins';
import { CoinsStorageDto } from '../models/coinsStorageDto';
import { SodaStorageDto } from '../models/sodaStorageDto';

@Component({
    selector: 'svm-admin',
    templateUrl: './svm.admin.component.html',
    providers: [DataService]
})
export class AdminComponent implements OnInit {

    sodaDto: SodaStorageDto = new SodaStorageDto();
    sodaArr: SodaStorageDto[];
    coin: Coins = new Coins();
    coinArr: CoinsStorageDto[];
    tableMode: boolean = true;
    coinsEdit: boolean = false;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadSoda();
        this.loadCoins();
    }

    loadSoda() {
        this.dataService.getSodaStorage()
            .subscribe((data: SodaStorageDto[]) => this.sodaArr = data);
    }
    loadCoins() {
        this.dataService.getCoinsStorage()
            .subscribe((data: CoinsStorageDto[]) => this.coinArr = data);
    }

    updateCoinsStorages() {
        this.coinsEdit = false
        this.dataService.updateCoinParams(this.coinArr)
            .subscribe(() => this.loadCoins())
    }

    createSoda() {
        if (this.sodaDto.value == null) {
            this.sodaDto.value = 0
        }
        this.dataService.createSoda(this.sodaDto)
            .subscribe(() => this.loadSoda());
        this.cancel();
    }
    updateSoda() {
            this.dataService.updateSoda(this.sodaArr)
            .subscribe(() => this.loadSoda()); 
        this.cancel();
    }

    imgChange(event: any) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = () => {
            this.sodaDto.img = reader.result.toString()
        }
    }

    convertToImage(str: string) {
        var image = new Image();
        image.src = str;
        return image.baseURI
    }

    editSoda(s: SodaStorageDto) {
        this.sodaDto = s;
    }

    cancel() {
        this.sodaDto = new SodaStorageDto();
        this.tableMode = true;
    }
    delete(s: Soda) {
        this.dataService.deleteSoda(s.id)
            .subscribe(() => this.loadSoda());
    }

    editCoins() {
        this.coinsEdit = true;
    }

    add() {
        this.cancel();
        this.tableMode = false;
    }
}