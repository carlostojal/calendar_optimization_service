import { SelectionMethod } from './SelectionMethod';

export class Tournament extends SelectionMethod {
    private tournamentSize: number;

    constructor(tournamentSize: number) {
        super();
        this.tournamentSize = tournamentSize;
    }

    public select(population: any[]): any[] {
        let selectedIndividuals = [];

        for (let i = 0; i < population.length; i++) {
            let tournamentIndividuals = [];
            // select random individuals for the tournament
            for (let j = 0; j < this.tournamentSize; j++) {
                let randomIndividual = population[Math.floor(Math.random() * population.length)];
                tournamentIndividuals.push(randomIndividual);
            }

            // select the best individual from the tournament
            let bestIndividual = tournamentIndividuals.reduce((prev, current) => (prev.Fitness > current.Fitness) ? prev : current);
            selectedIndividuals.push(bestIndividual);
        }

        return selectedIndividuals;
    }
}