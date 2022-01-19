import {injectable} from "inversify";
import StopException from "./StopException";
import {StartStopStatus} from "./StartStopStatus";

type OnChangedStartStopStatusListener = (status: StartStopStatus) => void;

@injectable()
export default class StartStopManager {
    private _status: StartStopStatus = StartStopStatus.대기중;

    get status(): StartStopStatus {
        return this._status;
    }

    private setStatus(status: StartStopStatus) {
        this._status = status;
        this._onChangedStatusListeners.forEach(listener => {
            listener(this._status);
        })
    }


    private _onChangedStatusListeners: OnChangedStartStopStatusListener[] = [];

    addOnChangedStatusListener(listener: OnChangedStartStopStatusListener) {
        this._onChangedStatusListeners.push(listener);
    }

    removeOnChangedStatusListener(listener: OnChangedStartStopStatusListener) {
        const removedIndex = this._onChangedStatusListeners.findIndex(_listener => _listener === listener)
        this._onChangedStatusListeners.splice(removedIndex, 1);
    }

    clearOnChangedStatusListener() {
        this._onChangedStatusListeners.splice(0, this._onChangedStatusListeners.length);
    }

    async start(cb: () => void) {
        try {
            if (this.status === StartStopStatus.정지중 || this.status === StartStopStatus.실행중) {
                console.log("이미 실행중입니다.");
                return;
            }
            this.alreadyStopIsRequested = false;
            this.setStatus(StartStopStatus.실행중);
            console.log("실행합니다.");
            await cb();
            this.setStatus(StartStopStatus.대기중);
            console.log("정상 완료 되었습니다.")
        } catch (e) {
            if (e instanceof StopException) {
                console.log("정상 정지 되었습니다.");

                this.setStatus(StartStopStatus.대기중);
            } else {
                this.setStatus(StartStopStatus.에러);
                console.log("에러발생");
                throw e
            }
        }
    }

    requestStop() {
        if (this.status == StartStopStatus.실행중)
            this.setStatus(StartStopStatus.정지중);
    }


    private alreadyStopIsRequested = false;

    isStopping() {
        return this.status === StartStopStatus.정지중;
    }

    checkStopIsRequestedAndTrow() {
        // if (this.status === StartStopStatus.정지중 && !this.alreadyStopIsRequested) {
        if (this.status === StartStopStatus.정지중) {
            this.alreadyStopIsRequested = true;
            throw new StopException();
        }
    }

    ifStopIsRequestedThenThrow(e: any) {
        if (e instanceof StopException) {
            throw e;
        }
    }
}