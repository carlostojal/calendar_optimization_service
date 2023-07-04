import { SelectionMethod } from "./SelectionMethod";

export class Boltzmann extends SelectionMethod {

    private temperature: number;

    constructor(temperature: number) {
        super();
        this.temperature = temperature;
    }

    public select(population: any[]): any[] {
        let selectedIndividuals = [];

        // Calculate the sum of the exponentials of the fitnesses
        let sumOfExponentials = 0;
        for (let i = 0; i < population.length; i++) {
            let individual = population[i];
            sumOfExponentials += Math.exp(individual.Fitness / this.temperature);
        }

        // Calculate the probability of each individual
        let probabilities = [];
        for (let i = 0; i < population.length; i++) {
            let individual = population[i];
            let probability = Math.exp(individual.Fitness / this.temperature) / sumOfExponentials;
            probabilities.push(probability);
        }

        // Select the individuals
        for (let i = 0; i < population.length; i++) {
            let random = Math.random();
            let sum = 0;
            for (let j = 0; j < population.length; j++) {
                sum += probabilities[j];
                if (random < sum) {
                    selectedIndividuals.push(population[j]);
                    break;
                }
            }
        }

        return selectedIndividuals;
    }
}