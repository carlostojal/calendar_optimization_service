import { CalendarEvent } from "./CalendarEvent";

export class CalendarDayGeneticIndividual {
    
    // the genes are the ids of the events
    private genes: string[] = new Array<string>(48);
    private fitness: number = 0;

    constructor() {
        // initialize all genes to empty string
        this.genes.forEach(gene => {
            gene = "";
        });
    }

    public initializeGenes(events: CalendarEvent[]): void {
        // each gene is a block of 30 minutes
        // each gene is a string with the id of the event
        // the first gene is the block from 00:00 to 00:30
        // the second gene is the block from 00:30 to 01:00
        // populate the genes with the ids of the events
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let startHour = event.eventDate.getHours();
            let startMinutes = event.eventDate.getMinutes();
            let startBlock = startHour * 2 + Math.floor(startMinutes / 30);
            this.genes[startBlock] = event.id;
        }
    }

    public get Genes(): string[] {
        return this.genes;
    }

    public set Genes(genes: string[]) {
        this.genes = genes;
    }

    public get Fitness(): number {
        return this.fitness;
    }

    public set Fitness(fitness: number) {
        this.fitness = fitness;
    }
}