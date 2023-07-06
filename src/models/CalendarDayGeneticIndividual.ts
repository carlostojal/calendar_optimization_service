import { CalendarEvent, DayPeriod, Utils } from "@carlostojal/calendar_shared";

export class CalendarDayGeneticIndividual {

    private static readonly OVERLAP_PENALTY: number = 100;
    private static readonly DAY_PERIOD_PREFERENCE_VIOLATION_PENALTY: number = 5;
    private static readonly FIXED_EVENT_MOVE_PENALTY: number = 300;
    private static readonly WASTED_TIME_PENALTY: number = 100;
    private static readonly OFF_WORK_HOURS_EVENT_PENALTY: number = 250;
    
    // the genes are the ids of the events
    private _genes: CalendarEvent[] = new Array<CalendarEvent>(48);
    private _fitness: number | undefined = undefined;

    constructor() {
        // initialize all genes to empty string
        const padding: CalendarEvent = new CalendarEvent();
        padding.name = "<PADDING>";
        this._genes.fill(padding);
    }

    public initializeGenes(events: CalendarEvent[]): void {
        // put the events on random positions
        for (let i = 0; i < events.length; i++) {
            let targetIndex: number;
            do {
                // check if the target index is not already occupied
                targetIndex = Math.ceil(Math.random() * (this._genes.length - 1));
            } while(this._genes[targetIndex].hasOwnProperty("_genes"));
            this._genes[targetIndex] = events[i];
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
            this._fitness = this.evaluate();
        }
        return this._fitness as number;
    }

    public evaluate(): number {
        // the event overlap is penalized
        // not respecting the day period preference is penalized
        // moving fixed (not flexible) events is penalized
        // wasted (free) time in the middle of the day is penalized
        // events allocated in off-work hours are penalized
        // TODO: value if all the events finish early

        let overlappingBlockCount: number = 0;
        let dayPeriodPreferenceViolationCount: number = 0;
        let wastedTimeCount: number = 0;
        let offWorkHoursEventCount: number = 0;
        let fixedEventMoveCount: number = 0;

        let currentWastedBlockCount: number = 0;

        // an array of durations of ongoing events
        let iteratingOngoingEvents: number[] = [];

        // iterate over the genes
        for(let i = 0; i < this._genes.length; i++) {
            
            // this is not an empty block: an event is starting
            if(this._genes[i].name !== "<PADDING>") {
                // add the duration of this event in blocks to the array
                iteratingOngoingEvents.push(Math.ceil(this._genes[i].durationBlocks));

                // blocks are wasted only if they are in the middle of the day
                wastedTimeCount += currentWastedBlockCount;
                currentWastedBlockCount = 0;

                // check if the event is starting in the wrong day period
                if(this._genes[i].dayPeriod != null) {
                    if(Utils.getDayPeriodFromBlockIndex(i, this._genes[i].date) != this._genes[i].dayPeriod) {
                        dayPeriodPreferenceViolationCount++;
                    }
                }

                // check if the event was moved and should not be moved
                if(!this._genes[i].flexible) {
                    if(i != Utils.getBlockIndex(this._genes[i].date)) {
                        fixedEventMoveCount++;
                    }
                }

            }

            // check events in off-work hours
            if(Utils.getDayPeriodFromBlockIndex(i, this._genes[i].date) === DayPeriod.OFF_WORK) {
                offWorkHoursEventCount += iteratingOngoingEvents.length;
            } else {
                // check wasted time
                if(iteratingOngoingEvents.length == 0) {
                    currentWastedBlockCount++;
                }
            }

            // increment the overlap count
            overlappingBlockCount += Math.max(0, iteratingOngoingEvents.length - 1);

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

        if(this._fitness <= 0) {
            this._fitness = 99999999999999999;
        }
        
        return this._fitness;
    }

    public get events(): CalendarEvent[] {
        let events: CalendarEvent[] = [];
        
        // iterate over the genes
        for(let i = 0; i < this._genes.length; i++) {

            // this is not an empty block: an event is starting
            if(this._genes[i].name !== "<PADDING>") {

                // get the date from the block index
                this.genes[i].date = Utils.getDateFromBlockIndex(i, this.genes[i].date);

                this.genes[i].dayPeriod = Utils.getDayPeriodFromBlockIndex(i, this.genes[i].date);

                // add the event to the array
                events.push(this._genes[i]);
            }
        }

        return events;
    }
}