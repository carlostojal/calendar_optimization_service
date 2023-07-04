import { Mutation } from "./Mutation";
import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";
import { CalendarEvent } from "../../../models/CalendarEvent";

export class Swap extends Mutation {
    public mutate(individual: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual {
        // select two random indexes
        let firstEventIndex: number = Math.floor(Math.random() * individual.Genes.length);
        let secondEventIndex: number = Math.floor(Math.random() * individual.Genes.length);

        // get the events from the indexes
        let firstEvent: CalendarEvent = individual.Genes[firstEventIndex];
        let secondEvent: CalendarEvent = individual.Genes[secondEventIndex];

        // swap the events
        let temp: CalendarEvent = firstEvent;
        individual.Genes[firstEventIndex] = secondEvent;
        individual.Genes[secondEventIndex] = temp;

        return individual;
    }
}