import { CalendarDayGeneticPopulation } from "../../models/CalendarDayGeneticPopulation";

export abstract class SelectionMethod {
    public abstract select(population: CalendarDayGeneticPopulation): CalendarDayGeneticPopulation
}