import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";

export abstract class Mutation {
    public abstract mutate(individual: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual;
}
