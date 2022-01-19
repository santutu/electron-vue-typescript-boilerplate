import {injectable} from "inversify";
import Event from "../Event";
import Track from "./Track";
import DontStopOnError from "./DontStopOnError";
import {ClassConstructor} from "class-transformer/types/interfaces";
import TrackingResults from "./TrackingResults";

@injectable()
export default class Tracker<TrackItemType> {

    public readonly tracks: Track<TrackItemType>[] = []

    onStart: Event<{ track: Track<TrackItemType>, index: number }> = new Event();
    onDone: Event<{ track: Track<TrackItemType>, index: number, results: any }> = new Event();
    onError: Event<{ e: Error, track: Track<TrackItemType>, index: number }> = new Event();

    public trackingResults: TrackingResults = new TrackingResults();

    get length(): number {
        return this.tracks.length;
    }

    clear() {
        this.tracks.splice(0, this.tracks.length);
        return this;
    }

    async log() {
        this.onStart.addListener(({track, index}) => {
            console.log("start track", track.id)
            console.log(track.item, track.startTime)
        })
        this.onDone.addListener(({track, index}) => {
            console.log("done track", track.id)
            console.log(track.item, track.executionHms, `${track.startTime} ~ ${track.endTime}`)
        })
    }

    async track<ReturnType>(
        cb: ({DontStopOnError}: { DontStopOnError: ClassConstructor<DontStopOnError> }) => ReturnType,
        trackItem: TrackItemType
    ): Promise<ReturnType | undefined> {

        this.add(trackItem, cb);
        try {
            const results = await cb({DontStopOnError: DontStopOnError});
            this.done(trackItem, results);


            return results;
        } catch (e) {
            this.error(trackItem, e);

            if (e instanceof DontStopOnError) {
                return;
            }
            throw e;
        }
    }


    protected add(trackItem: TrackItemType, cb: Function) {
        const track = new Track(trackItem, cb);
        this.tracks.push(track)
        const index = this.tracks.length - 1
        this.onStart.invoke({track, index})

    }

    protected done(trackItem: TrackItemType, results: any) {
        const index = this.findTrackIdxByItem(trackItem);
        this.tracks.slice(index, 1)

        const doneTrack: Track<TrackItemType> = this.tracks[index];
        doneTrack.done();

        this.onDone.invoke({track: doneTrack, index, results})
        this.trackingResults.success();
    }

    protected error(trackItem: TrackItemType, e) {
        const index = this.findTrackIdxByItem(trackItem);
        // this.tracks.slice(index, 1)

        const errorTrack: Track<TrackItemType> = this.tracks[index];
        errorTrack.done();
        errorTrack.error = true;

        this.onError.invoke({e: e as any, track: errorTrack, index})
        this.trackingResults.error();

    }

    protected findTrackIdxByItem(trackItem: TrackItemType) {
        const index = this.tracks.findIndex(track => track.equalsByItem(trackItem))
        if (index === -1) {
            throw new Error(`No found done track : `)
            // throw new Error(`No found done command : ${trackItem.constructor.name}`)
        }
        return index
    }


}