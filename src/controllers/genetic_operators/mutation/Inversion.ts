import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";
import { Mutation } from "./Mutation";

export class Inversion extends Mutation {
    public mutate(individual: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual {
        let individual_genes = individual.genes;
        let size = individual_genes.length;

        // Get two random numbers
        let point1 = Math.floor(Math.random() * size);
        let point2 = Math.floor(Math.random() * size);

        // Make the smaller the start and the larger the end
        let start = Math.min(point1, point2);
        let end = Math.max(point1, point2);

        // Reverse the genes between the start and the end
        for (let i = start; i < end; i++) {
            let gene = individual_genes[i];
            individual_genes[i] = individual_genes[end];
            individual_genes[end] = gene;
            end--;
        }

        individual.genes = individual_genes;

        return individual;
    }
}