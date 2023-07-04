
export class CalendarDayGeneticIndividual {
    
    // the genes are the ids of the events
    private genes: string[] = [];

    public get Genes(): string[] {
        return this.genes;
    }

    public set Genes(genes: string[]) {
        this.genes = genes;
    }
}