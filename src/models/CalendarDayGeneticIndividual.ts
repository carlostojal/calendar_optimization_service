import { CalendarEvent } from "./CalendarEvent";
import { DayPeriod } from "./DayPeriod";
import { Utils } from "./Utils";

export class CalendarDayGeneticIndividual {

    private static readonly OVERLAP_PENALTY: number = 100;
    private static readonly DAY_PERIOD_PREFERENCE_VIOLATION_PENALTY: number = 70;
    private static readonly FIXED_EVENT_MOVE_PENALTY: number = 300;
    private static readonly WASTED_TIME_PENALTY: number = 100;
    private static readonly OFF_WORK_HOURS_EVENT_PENALTY: number = 150;
    
    // the genes are the ids of the events
    private _genes: CalendarEvent[] = new Array<CalendarEvent>(48);
    private _fitness: number | undefined = undefined;

    constructor() {
        // initialize all genes to empty string
        this._genes.fill({} as CalendarEvent);
    }

    public initializeGenes(events: CalendarEvent[]): void {
        // each gene is a block of 30 minutes
        // each gene is a string with the id of the event
        // the first gene is the block from 00:00 to 00:30
        // the second gene is the block from 00:30 to 01:00
        // populate the genes with the ids of the events
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let startBlock = Utils.getBlockIndex(event.eventDate);
            this._genes[startBlock] = event;
        }
    }

    public get genes(): CalendarEvent[] {
        return this._genes;
    }

    public set genes(genes: CalendarEvent[]) {
        this._genes = genes;
    }

    public get fitness(): number {
        if(this._fitness == undefined) {
            this.evaluate();
        }
        return this._fitness as number;
    }

    public evaluate(): number {
        // the event overlap is penalized
        // not respecting the day period preference is penalized
        // moving fixed (not flexible) events is penalized
        // wasted (free) time in the middle of the day is penalized
        // events allocated in off-work hours are penalized

        let overlappingBlockCount: number = 0;
        let dayPeriodPreferenceViolationCount: number = 0;
        let wastedTimeCount: number = 0;
        let offWorkHoursEventCount: number = 0;
        let fixedEventMoveCount: number = 0;

        // an array of durations of ongoing events
        let iteratingOngoingEvents: number[] = [];

        // iterate over the genes
        for(let i = 0; i < this._genes.length; i++) {
            
            // this is not an empty block: an event is starting
            if(this._genes[i] != {} as CalendarEvent) {
                iteratingOngoingEvents.push(Math.ceil(this._genes[i].eventDurationMinutes / 30));

                // check if the event is starting in the wrong day period
                if(Utils.getDayPeriod(this._genes[i].eventDate) != this._genes[i].eventDayPeriod) {
                    dayPeriodPreferenceViolationCount++;
                }

                // check if the event is starting in off-work hours
                if(Utils.getDayPeriod(this._genes[i].eventDate) == DayPeriod.OFF_WORK) {
                    offWorkHoursEventCount++;
                }

                // check if the event was moved and should not be moved
                if(!this._genes[i].isFlexible) {
                    if(i != Utils.getBlockIndex(this._genes[i].eventDate)) {
                        fixedEventMoveCount++;
                    }
                }

            }

            // check wasted time
            if(Utils.getDayPeriodFromBlockIndex(i, this._genes[i].eventDate) !== DayPeriod.OFF_WORK) {
                if(iteratingOngoingEvents.length == 0) {
                    wastedTimeCount++;
                }
            }

            // increment the overlap count
            overlappingBlockCount += iteratingOngoingEvents.length - 1;

            // decrement the "until end" of ongoing events
            iteratingOngoingEvents.forEach((untilEndOfOngoingEvents, index) => {
                iteratingOngoingEvents[index]--;
                // remove the event if it is finished
                if(iteratingOngoingEvents[index] == 0) {
                    iteratingOngoingEvents.splice(index, 1);
                }
            });

        }

        this._fitness = overlappingBlockCount * CalendarDayGeneticIndividual.OVERLAP_PENALTY + dayPeriodPreferenceViolationCount * CalendarDayGeneticIndividual.DAY_PERIOD_PREFERENCE_VIOLATION_PENALTY +
        fixedEventMoveCount * CalendarDayGeneticIndividual.FIXED_EVENT_MOVE_PENALTY + wastedTimeCount * CalendarDayGeneticIndividual.WASTED_TIME_PENALTY + 
        offWorkHoursEventCount * CalendarDayGeneticIndividual.OFF_WORK_HOURS_EVENT_PENALTY;
        
        return this._fitness;
    }

    public get events(): CalendarEvent[] {
        let events: CalendarEvent[] = [];
        
        // iterate over the genes
        for(let i = 0; i < this._genes.length; i++) {

            // this is not an empty block: an event is starting
            if(this._genes[i] != {} as CalendarEvent) {

                // get the date from the block index
                this.genes[i].eventDate = Utils.getDateFromBlockIndex(i, this.genes[i].eventDate);

                // add the event to the array
                events.push(this._genes[i]);
            }
        }

        return events;
    }
}