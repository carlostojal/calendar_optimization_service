import { CalendarDayGeneticIndividual } from "./CalendarDayGeneticIndividual";
import { CalendarEvent } from "./CalendarEvent";
import { PMX } from "../controllers/genetic_operators/crossover/PMX";
import { OX } from "../controllers/genetic_operators/crossover/OX";
import { Translocation } from "../controllers/genetic_operators/mutation/Translocation";
import { Swap } from "../controllers/genetic_operators/mutation/Swap";
import { Inversion } from "../controllers/genetic_operators/mutation/Inversion";

export class CalendarDayGeneticPopulation {

    private _individuals: CalendarDayGeneticIndividual[] = [];
    private _populationSize: number = 0;
    private _events: CalendarEvent[] | undefined = [];
    private _bestIndividual: CalendarDayGeneticIndividual | undefined;

    private _mutationRate: number = 0.1;
    private _crossoverRate: number = 0.9;

    public get individuals(): CalendarDayGeneticIndividual[] {
        return this._individuals;
    }

    public set individuals(individuals: CalendarDayGeneticIndividual[]) {
        this._individuals = individuals;
        this._populationSize = individuals.length;
    }

    public get populationSize(): number | undefined {
        return this._populationSize;
    }

    public get events(): CalendarEvent[] | undefined {
        return this._events;
    }

    public set events(events: CalendarEvent[] | undefined) {
        this._events = events;
    }

    public get bestIndividual(): CalendarDayGeneticIndividual | undefined {
        return this._bestIndividual;
    }

    public get mutationRate(): number {
        return this._mutationRate;
    }

    public set mutationRate(mutationRate: number) {
        this._mutationRate = mutationRate;
    }

    public get crossoverRate(): number {
        return this._crossoverRate;
    }

    public set crossoverRate(crossoverRate: number) {
        this._crossoverRate = crossoverRate;
    }

    public generatePopulation(populationSize: number): void {
        this._populationSize = populationSize;
        if(this._populationSize != undefined && this._events != undefined) {
            for (let i = 0; i < this._populationSize; i++) {
                let newIndividual: CalendarDayGeneticIndividual = new CalendarDayGeneticIndividual();
                newIndividual.initializeGenes(this._events);
                this._individuals.push(newIndividual);
            }
        } else {
            throw new Error("Population size or events array is undefined");
        }
    }

    public evaluatePopulation(): CalendarDayGeneticIndividual {
        if(this._events != undefined) {
            // evaluate all individuals
            for (let i = 0; i < this._individuals.length; i++) {

                // evaluate the individual
                this._individuals[i].evaluate();

                // update the best individual
                if(this._bestIndividual == undefined || this._individuals[i].fitness < this._bestIndividual.fitness)
                    this._bestIndividual = this._individuals[i];

                console.log(this._individuals[i].fitness)

            }

            // return the best individual of the population
            return this._bestIndividual as CalendarDayGeneticIndividual;
        } else {
            throw new Error("Events array is undefined");
        }
    }

    public applyGeneticOperators(crossoverRate: number, mutationRate: number): void {

        this._crossoverRate = crossoverRate;
        this._mutationRate = mutationRate;

        const crossover = new PMX();
        const mutation = new Translocation();

        let newIndividuals: CalendarDayGeneticIndividual[] = [];

        // apply crossover
        for (let i = 0; i < this._populationSize; i++) {
            // considering crossover is done in consequent pairs, it is necessary to check if the current individual is the last one
            if(i <= this._populationSize - 2 && Math.random() < this._crossoverRate) {
                let offspring = crossover.crossover(this._individuals[i], this._individuals[i+1]);
                newIndividuals.push(offspring[0]);
                newIndividuals.push(offspring[1]);
                i++;
                // newIndividuals.push(this._individuals[i]);
            } else {
                newIndividuals.push(this._individuals[i]);
            }
        }

        // apply mutation
        for (let i = 0; i < newIndividuals.length; i++) {
            if(Math.random() < this._mutationRate) {
                newIndividuals[i] = mutation.mutate(newIndividuals[i]);
            }
        }

        this._individuals = newIndividuals;
    }

        

}