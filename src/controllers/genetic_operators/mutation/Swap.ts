import { Mutation } from "./Mutation";
import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";
import { CalendarEvent } from "@carlostojal/calendar_shared";

export class Swap extends Mutation {
    public mutate(individual: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual {
        // select two random indexes
        let firstEventIndex: number = Math.floor(Math.random() * individual.genes.length);
        let secondEventIndex: number = Math.floor(Math.random() * individual.genes.length);

        // get the events from the indexes
        let firstEvent: CalendarEvent = individual.genes[firstEventIndex];
        let secondEvent: CalendarEvent = individual.genes[secondEventIndex];

        // swap the events
        let temp: CalendarEvent = firstEvent;
        individual.genes[firstEventIndex] = secondEvent;
        individual.genes[secondEventIndex] = temp;

        return individual;
    }
}