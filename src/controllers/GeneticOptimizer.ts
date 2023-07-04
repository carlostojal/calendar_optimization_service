import { CalendarDayGeneticIndividual } from "../models/CalendarDayGeneticIndividual";
import { CalendarEvent } from "../models/CalendarEvent";
import { DayPeriod } from "../models/DayPeriod";
import { Utils } from "../models/Utils";

export class GeneticOptimizer {

    private static readonly OVERLAP_PENALTY: number = 100;
    private static readonly DAY_PERIOD_PREFERENCE_VIOLATION_PENALTY: number = 70;
    private static readonly FIXED_EVENT_MOVE_PENALTY: number = 300;
    private static readonly WASTED_TIME_PENALTY: number = 100;
    private static readonly OFF_WORK_HOURS_EVENT_PENALTY: number = 150;

    private static evaluate(individual: CalendarDayGeneticIndividual): number {
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
        for(let i = 0; i < individual.Genes.length; i++) {
            
            // this is not an empty block: an event is starting
            if(individual.Genes[i] != {} as CalendarEvent) {
                iteratingOngoingEvents.push(Math.ceil(individual.Genes[i].eventDurationMinutes / 30));

                // check if the event is starting in the wrong day period
                if(Utils.getDayPeriod(individual.Genes[i].eventDate) != individual.Genes[i].eventDayPeriod) {
                    dayPeriodPreferenceViolationCount++;
                }

                // check if the event is starting in off-work hours
                if(Utils.getDayPeriod(individual.Genes[i].eventDate) == DayPeriod.OFF_WORK) {
                    offWorkHoursEventCount++;
                }

                // check if the event was moved and should not be moved
                if(!individual.Genes[i].isFlexible) {
                    if(i != Utils.getBlockIndex(individual.Genes[i].eventDate)) {
                        fixedEventMoveCount++;
                    }
                }

            }

            // check wasted time
            if(Utils.getDayPeriodFromBlockIndex(i, individual.Genes[i].eventDate) !== DayPeriod.OFF_WORK) {
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
        
        return overlappingBlockCount * this.OVERLAP_PENALTY + dayPeriodPreferenceViolationCount * this.DAY_PERIOD_PREFERENCE_VIOLATION_PENALTY +
        fixedEventMoveCount * this.FIXED_EVENT_MOVE_PENALTY + wastedTimeCount * this.WASTED_TIME_PENALTY + offWorkHoursEventCount * this.OFF_WORK_HOURS_EVENT_PENALTY;
    }

    public static optimize(events: CalendarEvent[]): CalendarEvent[] {

        // initialize the genetic individual
        const calendarDayGeneticIndividual: CalendarDayGeneticIndividual = new CalendarDayGeneticIndividual();
        calendarDayGeneticIndividual.initializeGenes(events);

        // TODO
        return events;
    }
}