import { SelectionMethod } from "./SelectionMethod";
import { CalendarDayGeneticPopulation } from "../../models/CalendarDayGeneticPopulation";

export class Boltzmann extends SelectionMethod {

    private temperature: number;

    constructor(temperature: number) {
        super();
        this.temperature = temperature;
    }

    public select(population: CalendarDayGeneticPopulation): CalendarDayGeneticPopulation {
        let selectedIndividuals = [];

        const newPopulation = new CalendarDayGeneticPopulation();

        // Calculate the sum of the exponentials of the fitnesses
        let sumOfExponentials = 0;
        for (let i = 0; i < population.individuals.length; i++) {
            let individual = population.individuals[i];
            sumOfExponentials += Math.exp(individual.fitness / this.temperature);
        }

        // Calculate the probability of each individual
        let probabilities = [];
        for (let i = 0; i < population.individuals.length; i++) {
            let individual = population.individuals[i];
            let probability = Math.exp(individual.fitness / this.temperature) / sumOfExponentials;
            probabilities.push(probability);
        }

        // Select the individuals
        for (let i = 0; i < population.individuals.length; i++) {
            let random = Math.random();
            let sum = 0;
            for (let j = 0; j < population.individuals.length; j++) {
                sum += probabilities[j];
                if (random < sum) {
                    selectedIndividuals.push(population.individuals[j]);
                    break;
                }
            }
        }

        newPopulation.individuals = selectedIndividuals;

        return newPopulation;
    }
}