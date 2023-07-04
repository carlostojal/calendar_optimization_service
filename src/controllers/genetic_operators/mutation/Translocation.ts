import { Mutation } from "./Mutation";
import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";

export class Translocation extends Mutation {
    public mutate(individual: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual {
        let individual_genes = individual.Genes;
        let size = individual_genes.length;

        // Get two random numbers
        let point1 = Math.floor(Math.random() * size);
        let point2 = Math.floor(Math.random() * size);

        // Make the smaller the start and the larger the end
        let start = Math.min(point1, point2);
        let end = Math.max(point1, point2);

        // Translocate the genes between the start and the end
        let genes_to_translocate = individual_genes.slice(start, end);
        individual_genes.splice(start, end - start);
        individual_genes.splice(Math.floor(Math.random() * size), 0, ...genes_to_translocate);

        individual.Genes = individual_genes;

        return individual;
    }
}