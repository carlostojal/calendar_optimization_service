import { CalendarDayGeneticIndividual } from "../models/CalendarDayGeneticIndividual";
import { CalendarEvent } from "../models/CalendarEvent";

export class GeneticOptimizer {

    public static evaluate(individual: CalendarDayGeneticIndividual): number {
        // TODO
        return 0;
    }

    public static optimize(events: CalendarEvent[]): CalendarEvent[] {
        const calendarDayGeneticIndividual: CalendarDayGeneticIndividual = new CalendarDayGeneticIndividual();
        // TODO
        calendarDayGeneticIndividual.Genes = events.map((event: CalendarEvent) => event.id);
        return events;
    }
}