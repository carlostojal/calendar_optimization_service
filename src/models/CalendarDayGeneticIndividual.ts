
export class CalendarDayGeneticIndividual {
    
    // the genes are the ids of the events
    private genes: string[] = [];
    private fitness: number = 0;

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