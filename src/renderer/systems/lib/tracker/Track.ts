import {secondsToHms, uuid} from "../../../utils/utils";
import moment from "moment";

export default class Track<TrackItemType> {
    public readonly id = uuid()
    readonly start: number = moment().unix();

    private _end: number = 0;

    error: boolean = false;

    get end(): number {
        return this._end;
    }

    get startTime(): string {
        return moment.unix(this.start).format("HH:mm:ss")
    }

    get endTime(): string {
        return moment.unix(this.end).format("HH:mm:ss")
    }


    constructor(
        public readonly item: TrackItemType,
        public readonly func: Function
    ) {

    }

    equalsByItem(item: TrackItemType) {
        return this.item === item;
    }

    // get commandName(): string {
    //     return this.command.constructor.name;
    // }


    done() {
        this._end = moment().unix()
    }



    //ms
    get executionSeconds(): number {
        return this._end - this.start;
    }

    get executionHms(): string {
        return secondsToHms(this.executionSeconds);
    }
}