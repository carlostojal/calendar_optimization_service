import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";
import { CalendarEvent } from "../../../models/CalendarEvent";
import { Crossover } from "./Crossover";

export class PMX extends Crossover {
    public crossover(individual1: CalendarDayGeneticIndividual, individual2: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual[] {
        let offspring1: CalendarEvent[] = [];
        let offspring2: CalendarEvent[] = [];

        let individual1_genes = individual1.genes;
        let individual2_genes = individual2.genes;

        let size = individual1_genes.length;

        // Initialize the offspring
        for (let i = 0; i < size; i++) {
            offspring1.push({} as CalendarEvent);
            offspring2.push({} as CalendarEvent);
        }

        // Get two random numbers
        let point1 = Math.floor(Math.random() * size);
        let point2 = Math.floor(Math.random() * size);

        // Make the smaller the start and the larger the end
        let start = Math.min(point1, point2);
        let end = Math.max(point1, point2);

        // Copy the middle segment of the first parent to the first offspring
        for (let i = start; i < end; i++) {
            offspring1[i] = individual1_genes[i];
            offspring2[i] = individual2_genes[i];
        }

        // Fill the remaining positions with the genes of the second parent
        for (let i = 0; i < size; i++) {
            if (i < start || i >= end) {
                let gene1 = individual1_genes[i];
                let gene2 = individual2_genes[i];

                // If the gene of the second parent is not in the offspring, copy it
                if (!offspring1.includes(gene2)) {
                    offspring1[i] = gene2;
                }

                // If the gene of the first parent is not in the offspring, copy it
                if (!offspring2.includes(gene1)) {
                    offspring2[i] = gene1;
                }
            }
        }

        // create the instances of the offspring
        let offspring1_ind = new CalendarDayGeneticIndividual();
        offspring1_ind.genes = offspring1;
        let offspring2_ind = new CalendarDayGeneticIndividual();
        offspring2_ind.genes = offspring2;

        return [offspring1_ind, offspring2_ind];
    }
}