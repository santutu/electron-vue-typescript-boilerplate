import moment from "moment";
import {secondsToHms} from "../../utils/utils";
import {injectable} from "inversify";

@injectable()
export class Timer {

    endUpInterval: NodeJS.Timeout | null = null;
    start: number = 0;
    private _end: number = 0;

    get startTime(): string {
        if (this.start === 0) {
            return "00:00:00"
        }
        return moment.unix(this.start).format("HH:mm:ss")
    }

    get endTime(): string {
        if (this.end === 0) {
            return "00:00:00"
        }
        return moment.unix(this.end).format("HH:mm:ss")
    }

    get end(): number {
        return this._end;
    }


    //ms
    get executionSeconds(): number {
        return this._end - this.start;
    }

    get executionHms(): string {
        return secondsToHms(this.executionSeconds);
    }

    startUp() {
        this.start = moment().unix();
        this._end = moment().unix()
        this.endUpInterval = setInterval(() => {
            this._end = moment().unix()
        }, 1000)
    }


    endUp() {
        if (this.endUpInterval) {
            clearInterval(this.endUpInterval)
        }
        this._end = moment().unix()
    }
}