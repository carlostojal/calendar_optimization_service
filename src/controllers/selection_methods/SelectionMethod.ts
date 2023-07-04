import { CalendarDayGeneticIndividual } from "../../models/CalendarDayGeneticIndividual";

export abstract class SelectionMethod {
    public abstract select(population: CalendarDayGeneticIndividual[]): CalendarDayGeneticIndividual[]
}