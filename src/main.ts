import express, { Express, Request, Response } from 'express';
import 'dotenv';
import { CalendarEvent } from './models/CalendarEvent';
import { GeneticOptimizer } from './controllers/GeneticOptimizer';

const app: Express = express();

app.use(express.json());

app.post('/optimize', (req: Request, res: Response) => {
    const events: CalendarEvent[] = req.body.events;

    // initialize the genetic algorithm optimizer
    const geneticOptimizer: GeneticOptimizer = new GeneticOptimizer();

    // start the genetic algorithm
    const optimizedEvents: CalendarEvent[] = geneticOptimizer.optimize(events);

    // TODO: call the calendar service to save the optimized events
    
    res.send(optimizedEvents);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Optimization service listening on port ${port}`);
});