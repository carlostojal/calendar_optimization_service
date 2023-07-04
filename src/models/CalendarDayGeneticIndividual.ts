import { CalendarEvent } from "./CalendarEvent";
import { Utils } from "./Utils";

export class CalendarDayGeneticIndividual {
    
    // the genes are the ids of the events
    private genes: CalendarEvent[] = new Array<CalendarEvent>(48);
    private fitness: number = 0;

    constructor() {
        // initialize all genes to empty string
        this.genes.fill({} as CalendarEvent);
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
            this.genes[startBlock] = event;
        }
    }

    public get Genes(): CalendarEvent[] {
        return this.genes;
    }

    public set Genes(genes: CalendarEvent[]) {
        this.genes = genes;
    }

    public get Fitness(): number {
        return this.fitness;
    }

    public set Fitness(fitness: number) {
        this.fitness = fitness;
    }
}