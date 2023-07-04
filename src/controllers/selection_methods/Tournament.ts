import { SelectionMethod } from './SelectionMethod';
import { CalendarDayGeneticPopulation } from '../../models/CalendarDayGeneticPopulation';

export class Tournament extends SelectionMethod {
    private tournamentSize: number;

    constructor(tournamentSize: number) {
        super();
        this.tournamentSize = tournamentSize;
    }

    public select(population: CalendarDayGeneticPopulation): CalendarDayGeneticPopulation {
        let selectedIndividuals = [];

        for (let i = 0; i < population.individuals.length; i++) {
            let tournamentIndividuals = [];
            // select random individuals for the tournament
            for (let j = 0; j < this.tournamentSize; j++) {
                let randomIndividual = population.individuals[Math.floor(Math.random() * population.individuals.length)];
                tournamentIndividuals.push(randomIndividual);
            }

            // select the best individual from the tournament
            let bestIndividual = tournamentIndividuals.reduce((prev, current) => (prev.fitness > current.fitness) ? prev : current);
            selectedIndividuals.push(bestIndividual);
        }

        const newPopulation = new CalendarDayGeneticPopulation();
        newPopulation.individuals = selectedIndividuals;

        return newPopulation;
    }
}