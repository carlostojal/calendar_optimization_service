import { CalendarDayGeneticIndividual } from "../../../models/CalendarDayGeneticIndividual";
import { Crossover } from "./Crossover";

export class PMX extends Crossover {
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
  
      // Perform PMX crossover
      for (let i = start; i <= end; i++) {
        const gene1 = individual1.genes[i];
        const gene2 = individual2.genes[i];
  
        // Swap the genes between the parents
        offspring1Genes[i] = gene2;
        offspring2Genes[i] = gene1;
  
        // Update the mapping of swapped genes
        const mapping1 = offspring1Genes.indexOf(gene2);
        const mapping2 = offspring2Genes.indexOf(gene1);
        offspring1Genes[mapping1] = gene1;
        offspring2Genes[mapping2] = gene2;
      }
  
      // Fill in the remaining genes
      for (let i = 0; i < offspring1Genes.length; i++) {
        if (i < start || i > end) {
          const gene1 = individual1.genes[i];
          const gene2 = individual2.genes[i];
  
          // If the gene has not already been added to the offspring, add it
          if (!offspring1Genes.includes(gene1)) {
            let index = i;
            while (offspring1Genes[index] !== gene1) {
              index = offspring1Genes.indexOf(gene2);
            }
            offspring1Genes[index] = gene1;
          }
          if (!offspring2Genes.includes(gene2)) {
            let index = i;
            while (offspring2Genes[index] !== gene2) {
              index = offspring2Genes.indexOf(gene1);
            }
            offspring2Genes[index] = gene2;
          }
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