import { Crossover } from "./Crossover";
import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";

export class OX extends Crossover {

    public crossover(individual1: CalendarDayGeneticIndividual, individual2: CalendarDayGeneticIndividual): CalendarDayGeneticIndividual[] {
        // Generate two random crossover points
        const point1 = Math.floor(Math.random() * individual1.genes.length);
        const point2 = Math.floor(Math.random() * individual1.genes.length);

        // Determine the start and end points for the substring to be exchanged
        const start = Math.min(point1, point2);
        const end = Math.max(point1, point2);

        // Create new gene arrays for the offspring
        const offspring1Genes = Array.from(individual1.genes);
        const offspring2Genes = Array.from(individual2.genes);

        // Copy the substring from parent2 to offspring1 and from parent1 to offspring2
        for (let i = start; i <= end; i++) {
            const gene1 = individual1.genes[i];
            const gene2 = individual2.genes[i];
            offspring1Genes[i] = gene2;
            offspring2Genes[i] = gene1;
        }

        // Update the remaining genes of offspring1
        for (let i = 0; i < individual2.genes.length; i++) {
            if (!offspring1Genes.includes(individual2.genes[i])) {
            let index = (end + 1 + i) % individual2.genes.length;
            while (index !== end && offspring1Genes.includes(individual2.genes[index])) {
                index = (index + 1) % individual2.genes.length;
            }
            offspring1Genes[index] = individual2.genes[i];
            }
        }

        // Update the remaining genes of offspring2
        for (let i = 0; i < individual1.genes.length; i++) {
            if (!offspring2Genes.includes(individual1.genes[i])) {
            let index = (end + 1 + i) % individual1.genes.length;
            while (index !== end && offspring2Genes.includes(individual1.genes[index])) {
                index = (index + 1) % individual1.genes.length;
            }
            offspring2Genes[index] = individual1.genes[i];
            }
        }

        // Create new offspring individuals using the new gene arrays
        const offspring1 = new CalendarDayGeneticIndividual();
        offspring1.genes = offspring1Genes;
        const offspring2 = new CalendarDayGeneticIndividual();
        offspring2.genes = offspring2Genes;

        // Return the offspring individuals
        return [offspring1, offspring2];
    }
}