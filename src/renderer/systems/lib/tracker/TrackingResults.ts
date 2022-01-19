export default class TrackingResults {


    private _errorsCount: number = 0
    private _successCount: number = 0

    get errorsCount(): number {
        return this._errorsCount;
    }

    get successCount(): number {
        return this._successCount;
    }


    constructor() {
        this.clear();
    }


    clear() {
        this._errorsCount = 0;
        this._successCount = 0;
    }

    get totalCount() {
        return this.successCount + this.errorsCount;
    }

    success() {
        this._successCount += 1

    }

    error() {
        this._errorsCount += 1
    }

    executionTime(){

    }
}