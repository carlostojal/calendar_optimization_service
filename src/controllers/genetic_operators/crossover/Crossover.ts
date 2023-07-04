import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";

export abstract class Crossover {
    public abstract crossover(individual1: CalendarDayGeneticIndividual, individual2: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual[];
}