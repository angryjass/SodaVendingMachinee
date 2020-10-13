export class CoinsStorageDto {
    constructor(
        public id?: number,
        public name?: string,
        public value?: number,
        public isLocked?: boolean) { }
}