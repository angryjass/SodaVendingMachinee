import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Soda } from './models/soda';
import { CoinsStorageDto } from './models/coinsStorageDto';
import { SodaStorageDto } from './models/sodaStorageDto';

@Injectable()
export class DataService {

    private url = "/api/SodaVendingMachine";

    constructor(private http: HttpClient) {
    }

    getSodaStorage() {
        return this.http.get(this.url + '/getsodastorage');
    }

    getCoinsStorage() {
        return this.http.get(this.url + '/getcoinsstorage');
    }

    updateCoinParams(coinArr: CoinsStorageDto[]) {
        return this.http.post(this.url + '/updatecoinparams', coinArr)
    }

    createSoda(sodaDto: SodaStorageDto) {
        return this.http.post(this.url + '/createsoda', sodaDto);
    }

    updateSoda(sodaArr: SodaStorageDto[]) {

        return this.http.post(this.url + '/updatesodaparams', sodaArr);
    }

    deleteSoda(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}