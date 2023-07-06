import { CalendarDayGeneticIndividual } from "../models/CalendarDayGeneticIndividual";
import { CalendarDayGeneticPopulation } from "../models/CalendarDayGeneticPopulation";
import { CalendarEvent } from "@carlostojal/calendar_shared";
import { Tournament } from "./selection_methods/Tournament";

export class GeneticOptimizer {

    private static readonly TOURNAMENT_SIZE: number = 5;
    private static readonly POPULATION_SIZE: number = 100;
    private static readonly MAX_GENERATIONS: number = 100;
    private static readonly MUTATION_RATE: number = 0.35;
    private static readonly CROSSOVER_RATE: number = 0.8;

    private _bestIndividual: CalendarDayGeneticIndividual | undefined;

    public optimize(events: CalendarEvent[]): CalendarEvent[] {

        // initialize the initial genetic population
        let calendarDayGeneticPopulation: CalendarDayGeneticPopulation = new CalendarDayGeneticPopulation();
        calendarDayGeneticPopulation.events = events;
        calendarDayGeneticPopulation.generatePopulation(GeneticOptimizer.POPULATION_SIZE);

        // initialize the tournament
        const tournament: Tournament = new Tournament(GeneticOptimizer.TOURNAMENT_SIZE);

        this._bestIndividual = calendarDayGeneticPopulation.evaluatePopulation();

        // evolve the generations
        for(let generation: number = 0; generation < GeneticOptimizer.MAX_GENERATIONS; generation++) {

            // select the best individuals
            calendarDayGeneticPopulation = tournament.select(calendarDayGeneticPopulation);

            // apply genetic operators
            calendarDayGeneticPopulation.applyGeneticOperators(GeneticOptimizer.CROSSOVER_RATE, GeneticOptimizer.MUTATION_RATE);

            // evaluate the selected population
            const populationBest: CalendarDayGeneticIndividual = calendarDayGeneticPopulation.evaluatePopulation();

            if(populationBest.fitness < this._bestIndividual.fitness || this._bestIndividual == undefined) {
                this._bestIndividual = populationBest;
            }

            // console.log(this._bestIndividual.fitness)

        }

        console.log(`BEST: ${this._bestIndividual.fitness}`);

        // console.log(this._bestIndividual);
        this._bestIndividual.evaluate();

        return this._bestIndividual.events;
    }
}