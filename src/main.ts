import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { CalendarEvent } from './models/CalendarEvent';
import { GeneticOptimizer } from './controllers/GeneticOptimizer';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.post('/optimize', (req: Request, res: Response) => {
    const events = req.body;

    let calendarEvents: CalendarEvent[] = [];

    events.forEach((event: any) => {
        let newEvent: CalendarEvent = new CalendarEvent();
        newEvent.id = event.id || 0;
        newEvent.eventName = event.name || "New Event";
        newEvent.eventDescription = event.description || "";
        newEvent.eventDate = new Date(event.date);
        newEvent.isFlexible = event.flexible || true;
        newEvent.eventDurationMinutes = event.durationMinutes || 30;
        newEvent.eventDayPeriod = event.preferredDayPeriod || null;

        calendarEvents.push(newEvent);
    });

    // initialize the genetic algorithm optimizer
    const geneticOptimizer: GeneticOptimizer = new GeneticOptimizer();

    // start the genetic algorithm
    const optimizedEvents: CalendarEvent[] = geneticOptimizer.optimize(calendarEvents);

    // TODO: call the calendar service to save the optimized events
    
    res.send(optimizedEvents);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Optimization service listening on port ${port}`);
});