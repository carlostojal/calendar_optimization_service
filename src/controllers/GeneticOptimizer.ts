import { CalendarDayGeneticIndividual } from "../models/CalendarDayGeneticIndividual";
import { CalendarDayGeneticPopulation } from "../models/CalendarDayGeneticPopulation";
import { CalendarEvent } from "../models/CalendarEvent";
import { Tournament } from "./selection_methods/Tournament";

export class GeneticOptimizer {

    private static readonly TOURNAMENT_SIZE: number = 5;
    private static readonly POPULATION_SIZE: number = 100;
    private static readonly MAX_GENERATIONS: number = 100;
    private static readonly MUTATION_RATE: number = 0.1;
    private static readonly CROSSOVER_RATE: number = 0.9;

    private _bestIndividual: CalendarDayGeneticIndividual | undefined;

    public optimize(events: CalendarEvent[]): CalendarEvent[] {

        // initialize the initial genetic population
        let calendarDayGeneticPopulation: CalendarDayGeneticPopulation = new CalendarDayGeneticPopulation();
        calendarDayGeneticPopulation.events = events;
        calendarDayGeneticPopulation.generatePopulation(GeneticOptimizer.POPULATION_SIZE);

        // initialize the tournament
        const tournament: Tournament = new Tournament(GeneticOptimizer.TOURNAMENT_SIZE);

        // evolve the generations
        for(let generation: number = 0; generation < GeneticOptimizer.MAX_GENERATIONS; generation++) {

            // select the best individuals
            calendarDayGeneticPopulation = tournament.select(calendarDayGeneticPopulation);

            // apply genetic operators
            calendarDayGeneticPopulation.applyGeneticOperators(GeneticOptimizer.CROSSOVER_RATE, GeneticOptimizer.MUTATION_RATE);

            // evaluate the selected population
            this._bestIndividual = calendarDayGeneticPopulation.evaluatePopulation();

        }

        return this._bestIndividual!.events;
    }
}